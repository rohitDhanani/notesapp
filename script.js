const addbtn=document.getElementById("addbtn")
const sectionDisplayNotes=document.getElementById("displayNotes");

(function(){
// console.log("iife");
const notes=sessionStorage.getItem("notes")
if(notes){
    const parsedNotes=JSON.parse(notes);
    for(let el of parsedNotes){
        const note=document.createElement("p");
        note.innerText=el;
        const wrapperDiv=document.createElement("div");
        const deleteBtn=document.createElement("button");
        deleteBtn.innerText="Delete";
        deleteBtn.addEventListener("click",()=>{
        const removeElement=event.target.parentElement
        // console.log(removeElement.querySelector('p').innerText);
        const removeNoteFromSession=removeElement.querySelector('p').innerText;
        deleteFromSessionStorage(removeNoteFromSession)
        removeElement.remove();
        })
     
        wrapperDiv.appendChild(note)
        wrapperDiv.appendChild(deleteBtn)
        sectionDisplayNotes.appendChild(wrapperDiv);
    }
    
}
}())


const deleteFromSessionStorage=(removeNoteFromSession)=>{
    const notes=sessionStorage.getItem("notes");
    const parsedNotes = JSON.parse(notes);
    const newparsedNotes=parsedNotes.filter((el)=>{return el!=removeNoteFromSession})
    // console.log(newparsedNotes);
    sessionStorage.setItem("notes",JSON.stringify(newparsedNotes));
}

const storeNotes=(inputvalue)=>{
    const notes=sessionStorage.getItem("notes")
    if(notes){
       const parsedNotes= JSON.parse(notes)
       parsedNotes.push(inputvalue)
        sessionStorage.setItem("notes",JSON.stringify(parsedNotes));
    }else{
        const notes=[];
        notes.push(inputvalue);
        sessionStorage.setItem("notes",JSON.stringify(notes));

    }
}

const createDeleteBtnAndEvent=()=>{
   const deleteBtn= document.createElement("button");
   deleteBtn.innerText="Delete";
   deleteBtn.addEventListener("click",()=>{
    const removeElement=event.target.parentElement
    removeElement.remove();
   })

   return deleteBtn;
}

const addNote=()=>{

    const inputvalue=document.getElementById("tittle").value
    if(inputvalue.length){
    const note=document.createElement("p");
    note.innerText=inputvalue;
    const wrapperDiv=document.createElement("div");
    const deleteBtn=createDeleteBtnAndEvent();
    wrapperDiv.appendChild(note)
    wrapperDiv.appendChild(deleteBtn)

    sectionDisplayNotes.appendChild(wrapperDiv);
    storeNotes(inputvalue)
    document.getElementById("tittle").value="";
    }
    

}

addbtn.addEventListener("click",addNote)