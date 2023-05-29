

import base64
import hashlib
import hmac
import logging
from utils.singleton_exception import SingletonException

from utils.local_deps import  local_deps
local_deps()
from botocore.exceptions import ClientError
import uuid
logger = logging.getLogger(__name__)

class CognitoIdentityProviderWrapper:
    init = False
    def __init__(self, cognito_idp_client, user_pool_id, client_id, client_secret=None):
        if(self.init):
            raise SingletonException
        else:
            self.init = True
            self.cognito_idp_client = cognito_idp_client
            self.user_pool_id = user_pool_id
            self.client_id = client_id
            self.client_secret = client_secret
            self.UsernameExistsException =cognito_idp_client.exceptions.UsernameExistsException

    def _generate_cognito_username_id(self):
        return "aws-cidp-uid-" + str(uuid.uuid4())

    def _secret_hash(self, user_name):

        key = self.client_secret.encode()
        msg = bytes(user_name + self.client_id, 'utf-8')
        secret_hash = base64.b64encode(
            hmac.new(key, msg, digestmod=hashlib.sha256).digest()).decode()
        logger.info("Made secret hash for %s: %s.", user_name, secret_hash)
        return secret_hash

    def add_to_waitlist(self,email,phone):

        try:
            user_id = self._generate_cognito_username_id()
            self.cognito_idp_client.admin_create_user(
                UserPoolId= self.user_pool_id,
                Username=user_id,
                UserAttributes=[

                    {
                        'Name': 'email',
                        'Value': email
                    },
                    {
                        'Name': 'phone_number',
                        'Value': phone
                    },
                    {
                        'Name': 'custom:findmyrole_username',
                        'Value': ''
                    },
                ],
                MessageAction='SUPPRESS',
                DesiredDeliveryMediums=[
                    'EMAIL',
                    'SMS'
                ],
            )
            return user_id
        except self.UsernameExistsException as e:
            return self.admin_sign_up_user(email)



    def sign_up_user(self, user_name, password, user_email):

        try:
            kwargs = {
                'ClientId': self.client_id, 'Username': user_name, 'Password': password,
                'UserAttributes': [{'Name': 'email', 'Value': user_email}]}
            if self.client_secret is not None:
                kwargs['SecretHash'] = self._secret_hash(user_name)
            response = self.cognito_idp_client.sign_up(**kwargs)
            confirmed = response['UserConfirmed']
        except ClientError as err:
            if err.response['Error']['Code'] == 'UsernameExistsException':
                response = self.cognito_idp_client.admin_get_user(
                    UserPoolId=self.user_pool_id, Username=user_name)
                logger.warning("User %s exists and is %s.", user_name, response['UserStatus'])
                confirmed = response['UserStatus'] == 'CONFIRMED'
            else:
                logger.error(
                    "Couldn't sign up %s. Here's why: %s: %s", user_name,
                    err.response['Error']['Code'], err.response['Error']['Message'])
                raise
        return confirmed



    def resend_confirmation(self, user_name):

        try:
            kwargs = {
                'ClientId': self.client_id, 'Username': user_name}
            if self.client_secret is not None:
                kwargs['SecretHash'] = self._secret_hash(user_name)
            response = self.cognito_idp_client.resend_confirmation_code(**kwargs)
            delivery = response['CodeDeliveryDetails']
        except ClientError as err:
            logger.error(
                "Couldn't resend confirmation to %s. Here's why: %s: %s", user_name,
                err.response['Error']['Code'], err.response['Error']['Message'])
            raise
        else:
            return delivery



    def confirm_user_sign_up(self, user_name, confirmation_code):

        try:
            kwargs = {
                'ClientId': self.client_id, 'Username': user_name,
                'ConfirmationCode': confirmation_code}
            if self.client_secret is not None:
                kwargs['SecretHash'] = self._secret_hash(user_name)
            self.cognito_idp_client.confirm_sign_up(**kwargs)
        except ClientError as err:
            logger.error(
                "Couldn't confirm sign up for %s. Here's why: %s: %s", user_name,
                err.response['Error']['Code'], err.response['Error']['Message'])
            raise
        else:
            return True



    def list_users(self):

        try:
            response = self.cognito_idp_client.list_users(UserPoolId=self.user_pool_id)
            users = response['Users']
        except ClientError as err:
            logger.error(
                "Couldn't list users for %s. Here's why: %s: %s", self.user_pool_id,
                err.response['Error']['Code'], err.response['Error']['Message'])
            raise
        else:
            return users

    def start_sign_in(self, user_name, password):

        try:
            kwargs = {
                'UserPoolId': self.user_pool_id,
                'ClientId': self.client_id,
                'AuthFlow': 'ADMIN_USER_PASSWORD_AUTH',
                'AuthParameters': {'USERNAME': user_name, 'PASSWORD': password}}
            if self.client_secret is not None:
                kwargs['AuthParameters']['SECRET_HASH'] = self._secret_hash(user_name)
            response = self.cognito_idp_client.admin_initiate_auth(**kwargs)
            challenge_name = response.get('ChallengeName', None)
            if challenge_name == 'MFA_SETUP':
                if 'SOFTWARE_TOKEN_MFA' in response['ChallengeParameters']['MFAS_CAN_SETUP']:
                    response.update(self.get_mfa_secret(response['Session']))
                else:
                    raise RuntimeError(
                        "The user pool requires MFA setup, but the user pool is not "
                        "configured for TOTP MFA. This example requires TOTP MFA.")
        except ClientError as err:
            logger.error(
                "Couldn't start sign in for %s. Here's why: %s: %s", user_name,
                err.response['Error']['Code'], err.response['Error']['Message'])
            raise
        else:
            response.pop('ResponseMetadata', None)
            return response

    def get_mfa_secret(self, session):

        try:
            response = self.cognito_idp_client.associate_software_token(Session=session)
        except ClientError as err:
            logger.error(
                "Couldn't get MFA secret. Here's why: %s: %s",
                err.response['Error']['Code'], err.response['Error']['Message'])
            raise
        else:
            response.pop('ResponseMetadata', None)
            return response

    def verify_mfa(self, session, user_code):

        try:
            response = self.cognito_idp_client.verify_software_token(
                Session=session, UserCode=user_code)
        except ClientError as err:
            logger.error(
                "Couldn't verify MFA. Here's why: %s: %s",
                err.response['Error']['Code'], err.response['Error']['Message'])
            raise
        else:
            response.pop('ResponseMetadata', None)
            return response

    def respond_to_mfa_challenge(self, user_name, session, mfa_code):

        try:
            kwargs = {
                'UserPoolId': self.user_pool_id,
                'ClientId': self.client_id,
                'ChallengeName': 'SOFTWARE_TOKEN_MFA', 'Session': session,
                'ChallengeResponses': {
                    'USERNAME': user_name, 'SOFTWARE_TOKEN_MFA_CODE': mfa_code}}
            if self.client_secret is not None:
                kwargs['ChallengeResponses']['SECRET_HASH'] = self._secret_hash(user_name)
            response = self.cognito_idp_client.admin_respond_to_auth_challenge(**kwargs)
            auth_result = response['AuthenticationResult']
        except ClientError as err:
            if err.response['Error']['Code'] == 'ExpiredCodeException':
                logger.warning(
                    "Your MFA code has expired or has been used already. You might have "
                    "to wait a few seconds until your app shows you a new code.")
            else:
                logger.error(
                    "Couldn't respond to mfa challenge for %s. Here's why: %s: %s", user_name,
                    err.response['Error']['Code'], err.response['Error']['Message'])
                raise
        else:
            return auth_result

    def confirm_mfa_device(
            self, user_name, device_key, device_group_key, device_password, access_token,
            aws_srp):

        srp_helper = aws_srp.AWSSRP(
            username=user_name, password=device_password,
            pool_id='_', client_id=self.client_id, client_secret=None,
            client=self.cognito_idp_client)
        device_and_pw = f'{device_group_key}{device_key}:{device_password}'
        device_and_pw_hash = aws_srp.hash_sha256(device_and_pw.encode('utf-8'))
        salt = aws_srp.pad_hex(aws_srp.get_random(16))
        x_value = aws_srp.hex_to_long(aws_srp.hex_hash(salt + device_and_pw_hash))
        verifier = aws_srp.pad_hex(pow(srp_helper.g, x_value, srp_helper.big_n))
        device_secret_verifier_config = {
            "PasswordVerifier": base64.standard_b64encode(bytearray.fromhex(verifier)).decode('utf-8'),
            "Salt": base64.standard_b64encode(bytearray.fromhex(salt)).decode('utf-8')
        }
        try:
            response = self.cognito_idp_client.confirm_device(
                AccessToken=access_token,
                DeviceKey=device_key,
                DeviceSecretVerifierConfig=device_secret_verifier_config)
            user_confirm = response['UserConfirmationNecessary']
        except ClientError as err:
            logger.error(
                "Couldn't confirm mfa device %s. Here's why: %s: %s", device_key,
                err.response['Error']['Code'], err.response['Error']['Message'])
            raise
        else:
            return user_confirm

    def sign_in_with_tracked_device(
            self, user_name, password, device_key, device_group_key, device_password,
            aws_srp):

        try:
            srp_helper = aws_srp.AWSSRP(
                username=user_name, password=device_password,
                pool_id='_', client_id=self.client_id, client_secret=None,
                client=self.cognito_idp_client)

            response_init = self.cognito_idp_client.initiate_auth(
                ClientId=self.client_id, AuthFlow='USER_PASSWORD_AUTH',
                AuthParameters={
                    'USERNAME': user_name, 'PASSWORD': password, 'DEVICE_KEY': device_key})
            if response_init['ChallengeName'] != 'DEVICE_SRP_AUTH':
                raise RuntimeError(
                    f"Expected DEVICE_SRP_AUTH challenge but got {response_init['ChallengeName']}.")

            auth_params = srp_helper.get_auth_params()
            auth_params['DEVICE_KEY'] = device_key
            response_auth = self.cognito_idp_client.respond_to_auth_challenge(
                ClientId=self.client_id,
                ChallengeName='DEVICE_SRP_AUTH',
                ChallengeResponses=auth_params
            )
            if response_auth['ChallengeName'] != 'DEVICE_PASSWORD_VERIFIER':
                raise RuntimeError(
                    f"Expected DEVICE_PASSWORD_VERIFIER challenge but got "
                    f"{response_init['ChallengeName']}.")

            challenge_params = response_auth['ChallengeParameters']
            challenge_params['USER_ID_FOR_SRP'] = device_group_key + device_key
            cr = srp_helper.process_challenge(challenge_params)
            cr['USERNAME'] = user_name
            cr['DEVICE_KEY'] = device_key
            response_verifier = self.cognito_idp_client.respond_to_auth_challenge(
                ClientId=self.client_id,
                ChallengeName='DEVICE_PASSWORD_VERIFIER',
                ChallengeResponses=cr)
            auth_tokens = response_verifier['AuthenticationResult']
        except ClientError as err:
            logger.error(
                "Couldn't start client sign in for %s. Here's why: %s: %s", user_name,
                err.response['Error']['Code'], err.response['Error']['Message'])
            raise
        else:
            return auth_tokens


