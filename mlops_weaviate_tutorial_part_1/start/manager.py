import base64
import threading
import time
from tkinter import Image
from video_player_app import  play_video
import weaviate
import os
import json
import pygame
import cv2

DEFAULT_SCHEMA_NAME = "Animals"
class WeaviateManager:

  def _to_base_64(self,path):
    with open(path, 'rb') as file:
        return base64.b64encode(file.read()).decode('utf-8')

  def show_image(self, path):
      try:
          img = cv2.imread(path, cv2.IMREAD_ANYCOLOR)

          cv2.imshow(path, img)
          cv2.waitKey(0)
      except Exception as e:
          print(f"Error: {e}")

  def play_audio(self,audio_path):
    try:
        pygame.init()
        pygame.mixer.init()
        pygame.mixer.music.load(audio_path)
        pygame.mixer.music.set_volume(0.5)  # Set volume (0.0 to 1.0)
        pygame.mixer.music.play()

        while pygame.mixer.music.get_busy():
            user_input = input("Enter 'p' to pause, 'r' to resume, 's' to stop, or 'q' to quit: ")

            if user_input == 'p':
                pygame.mixer.music.pause()
            elif user_input == 'r':
                pygame.mixer.music.unpause()
            elif user_input == 's':
                pygame.mixer.music.stop()
                break
            elif user_input == 'q':
                pygame.mixer.music.stop()
                pygame.quit()
                break

    except Exception as e:
        print(f"Error: {e}")
    finally:
        pygame.quit()

