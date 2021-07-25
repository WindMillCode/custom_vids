import sys
sys.path[0] += "\\site-packages"
import os
from PIL import Image
import requests
from io import BytesIO
url = "https://uc7354fab893eaf8eaba499720df.previews.dropboxusercontent.com/p/thumb/ABLaFfueJ6epfZDdZJPbu3g7j_zawSHSBl2AzxRAuir8Eh-EGLebsV-TO9aBlDqn15UWXzCUPMjot2w5T7NVNW-YRGiVvsvj-YBHoAetnLxp5LbrvTmHRr2rZ16NIPFn6fm5rD3aOH7FAJM6dMoqQVZrKaqP3FNaOKWaDrfBadJL-UPOvNk28x8kWbTmSG_xBUf9XRbhMZZvrOm_l-LlCRI0AD5I5wqT3xfrsJUBo1q0Jzj5LGE5Ih106zt1y342IdjlKu2kJnEpa7aJJMgv_YAV87o2LWhW6c4OBDW4v60xa-RfYxTE2vQr09HD4bSxCpLP-eVK7u0Wvvt_ksaUDWKFfHRJiBDXhjl0LMgfRyF3EhNnz1Y5Ya0oceLQCbebFxrQXGy_h85mbI9a4qLW_pbI/p.jpeg?fv_content=true&size_mode=5"
response = requests.get(url)
img = Image.open(BytesIO(response.content))

response =requests.post(
    "https://cloud-westus.ocrsdk.com.ocrsdk.com/v2/processReceipt",
    data=response.content,
    auth=(os.environ["ABBYY_USERNAME"],os.environ["ABBYY_PASSWORD"])
)
print(response)
