const title=document.getElementById("title")
const addbtn=document.getElementById("addbtn")
const sectionDisplayNotes=document.getElementById("displayNotes");
const description=document.getElementById("description")
const dueDate=document.getElementById("dueDate")
const importance=document.getElementById("importance")


const getParsedNotesFromSessionStorage=()=>{
    let notes=sessionStorage.getItem("notes")
    if(notes){
        notes= JSON.parse(notes);
    }
    return notes;
}
const showNotesFromSessionStorage=()=>{
    let notes= getParsedNotesFromSessionStorage();
    if(notes){
        notes.forEach(note => {
            
            addNote(note.notetitle,note.notedescription,note.notedueDate,note.noteimportance);
        });
    }
}

const deleteFromSessionStorage=(removeNoteFromSession)=>{
    
    let notes = getParsedNotesFromSessionStorage();
   
     notes=notes.filter((el)=>{return el.notetitle!=removeNoteFromSession})
    
    sessionStorage.setItem("notes",JSON.stringify(notes));
}
const storeNotes=(title,description,dueDate,importance)=>{
    
    let notes=getParsedNotesFromSessionStorage();
    if(notes){
        let noteObj={
            notetitle:title,
            notedescription:description,
            notedueDate:dueDate,
            noteimportance:importance
        }
    
       notes.push(noteObj)
        sessionStorage.setItem("notes",JSON.stringify(notes));
    }else{
        const notes=[];
        let noteObj={
            notetitle:title,
            notedescription:description,
            notedueDate:dueDate,
            noteimportance:importance
        }
        notes.push(noteObj);
        sessionStorage.setItem("notes",JSON.stringify(notes));

    }
}
const createDeleteBtnAndEvent=()=>{
   const deleteBtn= document.createElement("button");
   deleteBtn.innerText="Delete";
   deleteBtn.addEventListener("click",()=>{
    const removeElement=event.target.parentElement
    const removeNoteFromSession=removeElement.querySelector('p').innerText;
    // console.log(removeNoteFromSession);
    deleteFromSessionStorage(removeNoteFromSession);

    removeElement.remove();
   })

   return deleteBtn;
}

const createParagraphAndInsertValue=(value)=>{
    let p=document.createElement("p");
    p.innerText=value;
    return p;
}

const createDivTagAndInsertElements=(titleTag,descriptionTag,dueDateTag,importanceTag,deleteBtn)=>{
    let div=document.createElement("div")
    div.appendChild(titleTag)
    div.appendChild(descriptionTag)
    div.appendChild(dueDateTag)
    div.appendChild(importanceTag)
    div.appendChild(deleteBtn)
    return div;
}

const addNote=(title,description,dueDate,importance)=>{  
    if(title.length){
    // const note=document.createElement("p");
    // note.innerText=value;
    
    const titleTag=createParagraphAndInsertValue(title)
    const descriptionTag=createParagraphAndInsertValue(description)
    const dueDateTag=createParagraphAndInsertValue(dueDate)
    const importanceTag=createParagraphAndInsertValue(importance)

    // const wrapperDiv=document.createElement("div");
    const deleteBtn=createDeleteBtnAndEvent();
    const wrapperDiv=createDivTagAndInsertElements(titleTag,descriptionTag,dueDateTag,importanceTag,deleteBtn);
    // wrapperDiv.appendChild(titleTag)
    // wrapperDiv.appendChild(deleteBtn)
    wrapperDiv.classList.add("box")
    sectionDisplayNotes.appendChild(wrapperDiv);
    }
}
document.addEventListener("DOMContentLoaded",showNotesFromSessionStorage);

addbtn.addEventListener("click",()=>{
    
    // storeNotes(title.value);
    storeNotes(title.value.toUpperCase(),description.value,dueDate.value,importance.value);
    addNote(title.value.toUpperCase(),description.value,dueDate.value,importance.value);

    console.log(title.value.toUpperCase());
    console.log(importance.value);
    console.log(dueDate.value);
    title.value="";
});