# -*- coding: utf-8 -*-
import sys, json, os


load = json.load(open(os.getcwd() + '/electron/databases/database_default.json'))
data_to_node = json.dumps(load)
data_to_python = json.loads(data_to_node)


def stdinHandler(text):
    texts = json.loads(text)
    for key in data_to_python['database_default'].keys():
        if key in texts.keys():
            return key
    return text


endpoint_texts = stdinHandler(sys.stdin.read().rstrip())


def get_current_collection(collection):
    data_to_angular = json.dumps(data_to_python['database_default'][collection])
    return data_to_angular


def returnSomeData(collection):
    data_to_angular = get_current_collection(collection)
    print(data_to_angular)
    sys.stdout.flush()


if endpoint_texts == "collection_dashboard":
    returnSomeData(endpoint_texts)
elif endpoint_texts == "collection_registers":
   returnSomeData(endpoint_texts)
elif endpoint_texts == "collection_users":
    returnSomeData(endpoint_texts)
else:
    print('Nenhum endpoint encontrado')
