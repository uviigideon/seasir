import glob
import re
import os
import tempfile
import xml.dom.minidom

# set things
pathBase = "/Users/uvii/proj/seasir/seasir" + os.sep
clipPathBase = pathBase + "clip" + os.sep
htmFilePathPtn = pathBase + "*.pl.htm"
shareDict = {}


print("clip path base =", clipPathBase)
print("htm File Path Pattern = ",htmFilePathPtn)

# functions
def getText(nodelist):
    rc = []
    for node in nodelist:
        # print("nodeType",node.nodeType)
        if node.nodeType == node.TEXT_NODE \
        or node.nodeType == node.CDATA_SECTION_NODE:
            rc.append(node.data)
    return ''.join(rc)
def loadSharePartXml2Dict(langName,rpDict) :
    xmlPath = pathBase + langName + ".sharePart.xml"
    print("read in dom", xmlPath)
    dom = xml.dom.minidom.parse(xmlPath)
    # print("done dom:", xmlPath)
    items = dom.getElementsByTagName("item")
    for item in items:
        key = getText(item.getElementsByTagName("key")[0].childNodes)
        val = getText(item.getElementsByTagName("val")[0].childNodes)
        rpDict[key] = val
def processMultiLang(xmlPath,tmpPath,fileName,tmpFile):
    print("read in dom", xmlPath)
    dom = xml.dom.minidom.parse(xmlPath)
    # print("done dom:", xmlPath)
    items = dom.getElementsByTagName("item")
    replaceDictionary = {}
    for item in items:
        key = getText(item.getElementsByTagName("key")[0].childNodes)
        val = getText(item.getElementsByTagName("val")[0].childNodes)
        replaceDictionary[key] = val
    langName = extractFirstFileName(xmlPath)
    if langName not in shareDict:
        shareDict[langName] = {}
        loadSharePartXml2Dict(langName,shareDict[langName])
    # print(replaceDictionary)
    fileNameWithFullPath = pathBase + langName + "/" + fileName
    # print(fileNameWithFullPath)
    # print("start write")
    #print("open file to read:"+tmpPath)
    #rFile = open(tmpPath,encoding="utf-8")
    rFile = tmpFile
    print("open file to write: "+fileNameWithFullPath)
    wFile = open(fileNameWithFullPath,'w',-1,"utf8")
    notes = []
    for line in rFile:
        # print(line)
        rtnStr = line
        ptnMatchs = re.findall(r'(###[a-zA-Z0-9\-\s]+###)',line)
        for ptnMatch in ptnMatchs:            
            try:
                newStr = replaceDictionary[ptnMatch]
                rtnStr = rtnStr.replace(ptnMatch,newStr)
            except KeyError:
                if ptnMatch in shareDict[langName]:
                    rtnStr = rtnStr.replace(ptnMatch, shareDict[langName][ptnMatch])
                else:
                    notes.append("\nptn:["+ptnMatch+"] from["+tmpPath+"] not fond in "+xmlPath)
        # print(rtnStr);
        # write rtnStr without \n
        # wFile.write(rtnStr[0:-1])
        wFile.write(rtnStr)
    # rFile.close()
    wFile.close()    
    # print("done")
    if (0 != len(notes)):
        return '\n'.join(str(x) for x in notes)
        
def processClip(fpath, tmpFile):
    rFile = open(fpath,encoding='utf8')
    #nowProcessing = None
    for line in rFile:
    #    if nowProcessing:
    #        ptnMatch = re.search(r'<!-- \}\}\}[\s]*([a-zA-Z0-9\-]+\.[a-zA-Z0-9\-]+)[\s]*',line)
    #        if ptnMatch and ptnMatch.group(1) == nowProcessing:
    #            print ("}",ptnMatch.group(1))
    #            nowProcessing = None
    #            tmpFile.write(line)
    #    else:
        ptnMatch = re.search(r'<!-- \{\{\{[\s]*([a-zA-Z0-9\-]+\.[a-zA-Z0-9\-]+)[\s]*',line)
        if ptnMatch and ptnMatch.group(1) in clipDict:
            # print ("{",ptnMatch.group(1))
            nowProcessing = ptnMatch.group(1)
            # tmpFile.write(line)
            tmpFile.write(clipDict[ptnMatch.group(1)])
            continue
        else:
            tmpFile.write(line)
    rFile.close()


def findMultiLangXMLPaths(idx):
    return glob.glob(pathBase + "*."+idx+".xml")
def extractFirstFileName(path):
    return os.path.basename(path).split('.',1)[0] 
def processTemplFileWithPath(fpath):
    print("processing file:",fpath)
    tmpFile = tempfile.TemporaryFile('w+',encoding='utf8')
    processClip(fpath,tmpFile)
    idx = extractFirstFileName(fpath)
    notes = []
    for xmlPath in findMultiLangXMLPaths(idx):
        tmpFile.seek(0)
        rtn = processMultiLang(xmlPath,fpath,idx+".htm",tmpFile)
        if (rtn != None):
            notes.append(rtn)
    tmpFile.close()
    if (0 != len(notes)):
        return '\n'.join(str(x) for x in notes)

# main
# 1. read in all clip name and body
fpaths = glob.glob(clipPathBase + "*")
print("find", len(fpaths), "clips")
clipDict = {}
for fpath in fpaths:
    with open(fpath,encoding="utf-8") as file:
        # read in and remove BOM(u\feff) in first char 
        clipDict[os.path.basename(fpath)] = (file.read())[1:]
# print(clipDict)

# 2. read all file match htmFilePathPtn
fpaths = glob.glob(htmFilePathPtn)
print("find", len(fpaths), htmFilePathPtn)
notes = []
for fpath in fpaths:
    rtn = processTemplFileWithPath(fpath)
    if (rtn != None):
        notes.append(rtn)

if (0 != len(notes)):
    print("Note:\n-------------------------\n")
    print('\n'.join(str(x) for x in notes))    
    input("press Enter")
