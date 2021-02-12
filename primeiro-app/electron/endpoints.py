# -*- coding: utf-8 -*-
import sys, json, os

endpoint_texts = sys.stdin.read().rstrip()

def get_current_collection(collection):
    load = json.load(open(os.getcwd() + '/electron/databases/database_default.json'))
    data_to_node = json.dumps(load)
    data_to_pythod = json.loads(data_to_node)
    data_to_angular = json.dumps(data_to_pythod['database_default'][collection])

    return data_to_angular


if endpoint_texts == "collection_dashboard":
    data_to_angular = get_current_collection(endpoint_texts)
    print(data_to_angular)
    sys.stdout.flush()
else:
    print('Nenhum endpoint encontrado')


