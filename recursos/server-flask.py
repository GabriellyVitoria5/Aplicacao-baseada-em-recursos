#!/usr/bin/env python
# encoding: utf-8

import json
from flask import Flask, request, jsonify
from flask import make_response
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# consultar registros pelo nome
@app.route('/', methods=['GET'])
def get_records():
    name = request.args.get('name')
    
    with open('data.txt', 'r') as f:
        data = f.read()
        records = json.loads(data)
        for record in records:
            if record['name'] == str(name):
                return jsonify(record)
        
        return jsonify({'error': 'data not found'}), 404

# listar todos os registros
@app.route('/all', methods=['GET'])
def get_all_records():
    with open('data.txt', 'r') as f:
        data = f.read()
        records = json.loads(data)

        if not records:
            return jsonify({"error": "any data found."}), 404
        
        return jsonify(records)

# criar novos registros
@app.route('/', methods=['POST'])
def create_record():
    record = json.loads(request.data)
    
    with open('data.txt', 'r') as f:
        data = f.read()
    
    if not data:
        records = [record]
    else:
        records = json.loads(data)
        records.append(record)

    if record not in records:
        return jsonify({"error": "falied to add new record."}), 500
    
    with open('data.txt', 'w') as f:
        f.write(json.dumps(records, indent=2))
    
    return jsonify({"record added": record}), 201

# atualizar todo o registro com base no nome (precisa de todas os campos do registro para alterar)
@app.route('/', methods=['PUT'])
def update_entire_record():
    record = json.loads(request.data)
    new_records = []
    updated = False
    
    with open('data.txt', 'r') as f:
        data = f.read()
        records = json.loads(data)
    
    for r in records:
        if r['name'] == record['name']:
            r = record # substitui o registro antigo pelo novo
            updated = True
        new_records.append(r)

    if not updated:
        return jsonify({"error": "any record with this name was found."}), 404
    
    with open('data.txt', 'w') as f:
        f.write(json.dumps(new_records, indent=2))
    
    return jsonify(record)

# apagar um  registro pelo nome (reescreve o arquivo sem o registro com o nome inserido na requisição)    
@app.route('/', methods=['DELETE'])
def delte_record():
    record = json.loads(request.data)
    new_records = []
    deleted = False
    
    with open('data.txt', 'r') as f:
        data = f.read()
        records = json.loads(data)
        
        for r in records:
            if r['name'] == record['name']:
                deleted = True
                continue
            new_records.append(r)

    if not deleted:
        return jsonify({"error": "any record with this name was found."}), 404
    
    with open('data.txt', 'w') as f:
        f.write(json.dumps(new_records, indent=2))
    
    return jsonify({"deleted_record": record})

# atualizar parcialmente o registro pelo nome
@app.route('/', methods=['PATCH'])
def partial_update_record():
    name = request.args.get('name')
    record = json.loads(request.data)
    new_records = []
    updated = False
    
    with open('data.txt', 'r') as f:
        data = f.read()
        records = json.loads(data)
    
    for r in records:
        if r['name'] == name:
            if "name" in record:
                r["name"] = record["name"]
            if "email" in data:
                r["email"] = record["email"]
            updated = True
        new_records.append(r)

    if not updated:
        return jsonify({"error": "any record with this name was found."}), 404

    with open('data.txt', 'w') as f:
        f.write(json.dumps(new_records, indent=2))

    return jsonify({"updated record": record})

# mostrar opções de requisição permitidas
@app.route('/', methods=['OPTIONS'])
def options_record():
    response = make_response()
    response.headers['Allow'] = 'GET, POST, PUT, PATCH, DELETE, OPTIONS'
    return response

app.run(debug=True)