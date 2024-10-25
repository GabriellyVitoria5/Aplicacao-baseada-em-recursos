#!/usr/bin/env python
# encoding: utf-8

import json
from flask import Flask, request, jsonify

app = Flask(__name__)

# consultar registros pelo nome
@app.route('/', methods=['GET'])
def query_records():
    name = request.args.get('name')
    
    with open('data.txt', 'r') as f:
        data = f.read()
        records = json.loads(data)
        for record in records:
            if record['name'] == str(name):
                return jsonify(record)
        
        return jsonify({'error': 'data not found'})

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
    
    with open('data.txt', 'w') as f:
        f.write(json.dumps(records, indent=2))
    
    return jsonify(record)

# atualizar todo o registro com base no nome (precisa de todas os campos do registro para alterar)
@app.route('/', methods=['PUT'])
def update_record():
    record = json.loads(request.data)
    new_records = []
    
    with open('data.txt', 'r') as f:
        data = f.read()
        records = json.loads(data)
    
    for r in records:
        if r['name'] == record['name']:
            r['email'] = record['email']
        new_records.append(r)
    
    with open('data.txt', 'w') as f:
        f.write(json.dumps(new_records, indent=2))
    
    return jsonify(record)

# apagar um  registro pelo nome (reescreve o arquivo sem o registro com o nome inserido)    
@app.route('/', methods=['DELETE'])
def delte_record():
    record = json.loads(request.data)
    new_records = []
    
    with open('data.txt', 'r') as f:
        data = f.read()
        records = json.loads(data)
        for r in records:
            if r['name'] == record['name']:
                continue
            new_records.append(r)
    
    with open('data.txt', 'w') as f:
        f.write(json.dumps(new_records, indent=2))
    
    return jsonify(record)

# atualizar parcialmente o registro pelo nome
@app.route('/', methods=['PATCH'])
def patch_user():
    name = request.args.get('name')
    record = json.loads(request.data)
    new_records = []
    
    with open('data.txt', 'r') as f:
        data = f.read()
        records = json.loads(data)
    
    for r in records:
        if r['name'] == name:
            if "name" in record:
                r["name"] = record["name"]
            if "email" in data:
                r["email"] = record["email"]
        new_records.append(r)


    with open('data.txt', 'w') as f:
        f.write(json.dumps(new_records, indent=2))

    return jsonify(new_records)

# mostrar opções de requisição permitidas
@app.route('/', methods=['OPTIONS'])
def options_record():
    response = jsonify({'Métodos permitidos': ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']})

    # define os cabeçalhos para CORS 
    response.headers['Allow'] = 'GET, POST, PUT, PATCH, DELETE, OPTIONS'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, PATCH, DELETE, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'

    return response

app.run(debug=True)