import json
import os

DATA_FILE = 'backend/data/users.json'

def load_users():
    if not os.path.exists(DATA_FILE):
        return []
    with open(DATA_FILE, 'r') as file:
        return json.load(file)

def save_user(user_data):
    users = load_users()
    users.append(user_data)
    with open(DATA_FILE, 'w') as file:
        json.dump(users, file, indent=4)

def find_user(username, password):
    users = load_users()
    for user in users:
        if user['username'] == username and user['password'] == password:
            return user
    return None
