import glob
import re
import os
import tempfile
import xml.dom.minidom
import pprint
import shutil
import cgi

# set things
pathBase = "/Users/uvii/proj/seasir/seasir" + os.sep
newXmlPath = pathBase + "newXmls" + os.sep
enFilePtn = pathBase + "en.*.xml"
langDict = {"ct","cn","kr"}


# functions
def getText(nodelist):
    rc = []
    for node in nodelist:
        # print("nodeType",node.nodeType)
        if node.nodeType == node.TEXT_NODE:
            rc.append(cgi.escape(node.data))
        elif node.nodeType == node.CDATA_SECTION_NODE:
            rc.append("<![CDATA[" + node.data + "]]>")
    return ''.join(rc)
        
def syncLangFile(baseDict, langXmlPath, keyIdx):
    langDom = xml.dom.minidom.parse(pathBase + langXmlPath)
    langItems = langDom.getElementsByTagName("item")
    langDict = {}
    for item in langItems:
        key = getText(item.getElementsByTagName("key")[0].childNodes)
        val = getText(item.getElementsByTagName("val")[0].childNodes)
        if key != "" :
            langDict[key] = val

    diff = set(baseDict.keys()) - set(langDict.keys())
    diffInv = set(langDict.keys()) - set(baseDict.keys())
    if not (diff | diffInv):
        print("do nothing")
        return

    for key in diffInv:
        langDict.pop(key,None)

    for key in diff:
        langDict[key] = baseDict[key]
        
    fileNameWithFullPath = newXmlPath + langXmlPath
    
    print("write file: " + fileNameWithFullPath)
    wFile = open(fileNameWithFullPath,'w',-1,"utf8")
    wFile.write("<items>")
    for key in keyIdx:
        wFile.write("\n\t<item>")
        wFile.write("\n\t\t<key>"+str(key)+"</key>")
        wFile.write("\n\t\t<val>"+str(langDict[key])+"</val>")
        if key in diff:
            wFile.write("\n\t\t<todo></todo>")
        wFile.write("\n\t</item>")            
    wFile.write("\n</items>")
    wFile.close()
            

    # pprint.pprint(langDict)
    # input("Enter")

def extractFirstFileName(path):
    return os.path.basename(path).split('.',1)[1] 

def processTemplFileWithPath(fpath):
    fileBody = extractFirstFileName(fpath)
    print("processing file:",fileBody)
    enXmlPath = pathBase + "en." + fileBody
    enDom = xml.dom.minidom.parse(enXmlPath)
    print("process dom:"+enXmlPath)
    items = enDom.getElementsByTagName("item")
    baseDict = {}
    keyIdx = []
    for item in items:
        key = getText(item.getElementsByTagName("key")[0].childNodes)
        val = getText(item.getElementsByTagName("val")[0].childNodes)
        if key != "" :
            baseDict[key] = val
            keyIdx.append(key)
                      
    for lang in langDict:
        langXmlPath = lang + "." + fileBody
        print("process lang:" + pathBase + langXmlPath)
        if os.path.isfile(pathBase + langXmlPath):
            syncLangFile(baseDict,langXmlPath,keyIdx)
        else:
            shutil.copy(enXmlPath, newXmlPath + langXmlPath)
        


# main
# 1. read all file match enFilePtn
fpaths = glob.glob(enFilePtn)
print("find", len(fpaths), enFilePtn)

for fpath in fpaths:
    processTemplFileWithPath(fpath)

# input("press Enter")
