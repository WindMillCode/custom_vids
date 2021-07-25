cd Env:
Set-Content -Path COGNITO_REGION_NAME        -Value 
Set-Content -Path COGNITO_USER_POOL_ID       -Value 
Set-Content -Path COGNITO_USER_CLIENT_ID     -Value 
Set-Content -Path COGNITO_CLIENT_SECRET      -Value 


Set-Content -Path STS_USER_CLIENT_ID         -Value 
Set-Content -Path STS_USER_CLIENT_SECRET     -Value 


set-location [location to torando server]
python tornado_server.py