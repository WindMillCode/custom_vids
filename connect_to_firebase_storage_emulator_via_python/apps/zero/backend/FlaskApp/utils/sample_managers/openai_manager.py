import json
import re
from utils.print_if_dev import print_if_dev
from utils.singleton_exception import SingletonException
from utils.local_deps import  local_deps
local_deps()
import openai

class OpenAIManager():
  init= False
  client = None
  def __init__(self,api_key):
    if(self.init):
      raise SingletonException
    else:
      self.init = True
      openai.api_key = api_key

  def _ask_chatgpt(self,prompt,randomness=0):
    prompt = re.sub(r"[\n\t\r\f]", "", prompt)
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{
          "role":"user",
          "content":prompt,
        }],
        temperature=randomness,
    )
    print_if_dev(response,True)
    return json.loads(response.choices[0].message.content)

  def retrieve_experience_projects_tools_certs(self,resume_text):
    prompt = """Take the following resume in the tildas and extract data in JSON according to this format
    and just only the properties specified in the following format, only data specified by the keys in the following JSON
    {{
      "work_experience":{{
        "[COMPANY_NAME_HERE]":{{
          "employment_dates":"[EMPLOYMENT_DATE_HERE]",
          "roles_and_resp":"[ROLES AND RESPONSIBILITES HERE AS A LIST]"
        }}
      }},
      "projects":{{
        "[PROJECT_NAME_HERE]":[ARRAY_OF_PROJECT_DETAILS_HERE]
      }},
      "tools":[ARRAY_OF_PROGRAMS_SOFTWARE_TOOLS_TECHNOLOGIES_HERE],
      "certs":[ARRAY_OF_CERTS_HERE]
    }} `{}`
      """.format(resume_text)
    return self._ask_chatgpt(prompt)

  def generate_sample_preparation_guide(self,resume_json,company_title,job_desc):
    prompt = """
    according the following json of a persons resume {},
    according to the company  {},
    according to the job desc {},
    provide the name of the vacancy job opening position
    come up with 3 questions as an interviewer you would ask the candiate along with the desired candidate answers,
    provide 3 facts about the company
    provide 2 latest things in the news about the company
    provide 2 questions the candidate should ask the intervierer, the JSON retured should be according to the following Typescript type no more no less and no newlines
    ensure its proper json, no commas at the end of the last index in an array, the interviewer property is an array of question answer pairs
    {{
      "role":VACANCY_POSITION_ROLE_NAME_HERE,
      "interviewer":{{
        "question":QUESTION_TEXT_HERE,
        "answer":ANSWER_TEXT_HERE
      }},
      "facts":[COMPANY_FACTS_HERE],
      "news":[LATEST_COMPANY_NEWS_HERE],
      "candidate_questions":[CANDIDATE_QUESTIONS_HERE]
    }}
    """.format(resume_json,company_title,job_desc)

    return self._ask_chatgpt(prompt,1)
