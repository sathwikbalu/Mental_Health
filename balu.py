import google.generativeai as genai
import os

# genai.configure(api_key=os.environ["AIzaSyBtLlboADtSAWc7X4N2hk0nPXkCMOPkR8U"])

model = genai.GenerativeModel("gemini-1.5-flash",api_key="AIzaSyBtLlboADtSAWc7X4N2hk0nPXkCMOPkR8U")
response = model.generate_content("Write a story about a magic backpack.")
print(response.text)