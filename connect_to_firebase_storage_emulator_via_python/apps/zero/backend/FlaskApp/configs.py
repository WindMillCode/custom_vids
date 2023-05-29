import os
from managers.firebase_manager import FirebaseManager
from managers.sentry_manager import SentryManager
from utils.env_vars import ENV_VARS
from utils.local_deps import  local_deps
local_deps()

class DevConfigs:


  endpointMsgCodes = {
    'success':'OK',
    'error':'ERROR',
  }


  app ={}
  sentry_manager = SentryManager()
  firebase_manager = FirebaseManager(ENV_VARS)

  def _create_app_info_obj(self,backend_port=5003):

    return {
      'access_control_allow_origin':['https://example.com:4200','https://example.com:4201'],
      'server_name':'example.com:{}'.format(backend_port),
      'domain_name':'https://example.com:{}'.format(backend_port),
      'flask_env':'development',
      'frontend_angular_app_url':'https://example.com:4200',
      'frontend_angular_app_domain':'example.com',
      'backend_port':backend_port
    }

  def __init__(self):
    self.app =self._create_app_info_obj()
    None




class TestConfigs(DevConfigs):
  None

class PreviewConfigs(DevConfigs):

  def __init__(self) -> None:
    super().__init__()
    self.app['flask_env'] = 'production'
    self.app['access_control_allow_origin'] = ["https://ui.preview.example.com"]
    self.app.pop('server_name')
    self.app.pop('domain_name')
    self.app['frontend_angular_app_url'] = "https://ui.preview.example.com"
    self.app['frontend_angular_app_domain'] = "ui.preview.example.com"

class ProdConfigs(DevConfigs):

  def __init__(self) -> None:
    super().__init__()
    self.app['flask_env'] = 'production'
    self.app['access_control_allow_origin'] = ["https://example.com"]
    self.app.pop('server_name')
    self.app.pop('domain_name')
    self.app['frontend_angular_app_url'] = "https://example.com"
    self.app['frontend_angular_app_domain'] = "www.example.com"



CONFIGS:DevConfigs= {
  'PROD':lambda x:ProdConfigs(),
  'PREVIEW':lambda x:PreviewConfigs(),
  'DEV':lambda x:DevConfigs(),
  'TEST':lambda x:TestConfigs(),
}[ENV_VARS.get("FLASK_BACKEND_ENV")](None)











