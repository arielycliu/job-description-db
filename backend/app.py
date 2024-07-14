from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from credentials import MONGO_URI

app = Flask(__name__)
app.config["MONGO_URI"] = MONGO_URI

mongo = PyMongo(app)
descriptions = mongo.db["descriptions"]

@app.route('/add_description', methods=['POST'])
def add_user():
    data = request.json
    descriptions.insert_one(data)
    return jsonify(message="Data added successfully"), 201

@app.route('/descriptions', methods=['GET'])
def get_users():
    data = descriptions.find()
    # convert to dict
    data_list = [{item: d[item] for item in d if item != '_id'} for d in data]
    return jsonify(data_list), 200

if __name__ == '__main__':
    app.run(debug=True)
