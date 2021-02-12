# -*- coding: utf-8 -*-
import sys,json, os

getData = sys.stdin.readlines()
load = json.load(open(os.getcwd() + '/electron/databases/database_default.json'))
dump = json.dumps(load)

print(dump)
sys.stdout.flush()