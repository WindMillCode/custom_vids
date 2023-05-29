from utils.singleton_exception import SingletonException
from utils.local_deps import  local_deps
local_deps()
import textrazor

class TextRazorManager():
  init= False
  client = None
  def __init__(self,api_key):
    if(self.init):
      raise SingletonException
    else:
      self.init = True
      textrazor.api_key = api_key
      self.client = textrazor.TextRazor(extractors=["work experience", "projects" , "tools and technologies", "certifications"])
