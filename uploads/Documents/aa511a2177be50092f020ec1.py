import os
from tkinter import *

def func1(Type,e,l3):
    _dir_=os.getcwd()
    if Type == "Original" :
        _dir_+='\\supports\\aktech\\bno.txt'
    else:
        _dir_+='\\supports\\aktech\\dno.txt'
    fo=open(_dir_,'w')
    fo.write(e.get())
    fo.close()
    l3['text']=Type+" Bill No. has been change successfully."
    

root=Tk()
root.geometry('650x500')
_dir_=os.getcwd()
_dir1_=_dir_+'\\supports\\aktech\\bno.txt'
_dir2_=_dir_+'\\supports\\aktech\\dno.txt'
fo=open(_dir1_,"r")
bno=fo.read()
fo.close()
bno_="Current Original Number : "
fo=open(_dir2_,"r")
dno=fo.read()
fo.close()
dno_="    Current Copy Number : "
l1=Label(root,text=bno_,font=('Times',14))
l2=Label(root,text=dno_,font=('Times',14))
l3=Label(root,text="",font=('Times',18))
e1=Entry(root,font=('Times',18),width=5)
e2=Entry(root,font=('Times',18),width=5)
b1=Button(root,text="Change",command=lambda:func1("Original",e1,l3))
b2=Button(root,text="Change",command=lambda:func1("Copy",e2,l3))

e1.insert(0,bno)
e2.insert(0,dno)

l1.place(x=10,y=13)
l2.place(x=10,y=63)
l3.place(x=10,y=250)
e1.place(x=270,y=15)
e2.place(x=270,y=60)
b1.place(x=370,y=15)
b2.place(x=370,y=60)
root.mainloop()


