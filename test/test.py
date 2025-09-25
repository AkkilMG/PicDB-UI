import requests

file_path = './logo.png'
url = 'https://picdb-api.arkynox.com/upload'

with open(file_path, 'rb') as f:
    files = {'file': (file_path, f)}
    response = requests.post(url, files=files)

print('Status code:', response.status_code)
print('Response:', response.text)