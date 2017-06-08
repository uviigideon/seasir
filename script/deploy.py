# usage python3 ./seasir/script/deploy.py < config.json

import sys
import json
import pprint
import os
import shutil

langs = ['en','ct','cn','kr']
cwd = os.getcwd()
deploy_path = os.path.join(cwd,'deploy')
source_path = os.path.join(cwd,'seasir')

# create deploy folders
if not os.path.exists(deploy_path):
    os.makedirs(deploy_path)
for lang in langs:
    d_path = os.path.join(deploy_path,lang)
    if not os.path.exists(d_path):
        os.makedirs(d_path)
    

data = json.load(sys.stdin)
# pprint.pprint(data)
errors = []

def process_htmls(names): # {{{
    for lang in langs:
        d_path = os.path.join(deploy_path,lang)
        s_path = os.path.join(source_path,lang)
        for name in names:
            filename = name + ".htm"
            source = os.path.join(s_path,filename)
            dest = os.path.join(d_path,filename)
            try:
                if os.path.isfile(source):
                    shutil.copyfile(source,dest)
                    print(source, " > ", dest)
            except (IOError,os.error) as why:
                errors.append((source,dest,str(why)))
            except Error as err:
                errors.extend(err.arg[0])
#}}}

def copy_resources(prefix,ress):
    s_path = os.path.join(source_path,prefix)
    for lang in langs:
        d_path = os.path.join(deploy_path,lang)
        for key, values in ress.items():
            for value in values:
                dest = os.path.join(d_path,key)
                if not os.path.exists(dest):
                    os.makedirs(dest)
                dest = os.path.join(dest,value)
                source = os.path.join(s_path,key,value)
                try:
                    if os.path.isfile(source):
                        shutil.copyfile(source,dest)
                        print(source, " > ", dest)
                except (IOError,os.error) as why:
                    errors.append((source,dest,str(why)))
                except Error as err:
                    errors.extend(err.arg[0])


for key, value in data.items():
    if "htm" == key:
        process_htmls(value)
    elif "resource" == key:
        copy_resources(key,value)
    else:
        print("unknown key: ",key)
        

if errors:
    raise NameError(errors)
else:
    print("done")
