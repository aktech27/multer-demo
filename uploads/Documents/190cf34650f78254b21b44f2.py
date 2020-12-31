from supports.inner import webfill 
import webbrowser
import os
import time

#chrome_path ="C:/Program Files (x86)/Google/Chrome/Application/chrome.exe %s"
chrome_path ="C:/Users/sys/AppData/Local/Google/Chrome/Application/chrome.exe %s"


fileobj=open((os.getcwd()+'\\web2.html'),'w')
fileobj.write(webfill.web2)
fileobj.close()

fileobj=open((os.getcwd()+'\\web2.css'),'w')
fileobj.write(webfill.webcss)
fileobj.close()

fileobj=open((os.getcwd()+'\\web2.js'),'w')
fileobj.write(webfill.webjs)
fileobj.close()

webbrowser.get(chrome_path).open_new_tab((os.getcwd()+'\\web2.html'))

os.remove((os.getcwd()+'\\web2.html'))
os.remove((os.getcwd()+'\\web2.css'))
os.remove((os.getcwd()+'\\web2.js'))


##webbrowser.open_new_tab((os.getcwd()+'\\web2.html'))
