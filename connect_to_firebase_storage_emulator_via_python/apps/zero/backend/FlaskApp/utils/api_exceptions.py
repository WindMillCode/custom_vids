from abc import ABC


class APIError(Exception):
    description = "An error occured"
    """All custom API Exceptions"""
    def __init__(self, desc=None):
      self.description = desc if desc else self.description


class APIAuthError(APIError):
  code = 403
  description = "Authentication Error"

class APIServerError(APIError):
  code = 500
  description = "The server is having an issue processing the request please contact developer support"

class APIClientError(APIError):
  code = 404
  description = "bad input from the client please have the client review the request for any incorrect params, and/or request body properties and try again"

