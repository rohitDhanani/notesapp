const title=document.getElementById("title")
const addbtn=document.getElementById("addbtn")
const sectionDisplayNotes=document.getElementById("displayNotes");
const description=document.getElementById("description")
const dueDate=document.getElementById("dueDate")
const importance=document.getElementById("importance")
const create=document.getElementById("create")
const closebtn=document.getElementById("close")
const createNotePopUP = document.getElementById("createNotePopUP")

const nothingToPreviewText=document.getElementById("nothingToPreview")


const getParsedNotesFromSessionStorage=()=>{
    let notes=sessionStorage.getItem("notes")
    if(notes){
        notes= JSON.parse(notes);
    }
    return notes;
}
const showNotesFromSessionStorage=()=>{
    let notes= getParsedNotesFromSessionStorage();
    if(notes.length){
        
        nothingToPreviewText.classList.add("notActive");
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
   deleteBtn.classList.add("deleteBtn")
   deleteBtn.addEventListener("click",()=>{
    const removeElement=event.target.parentElement
    const removeNoteFromSession=removeElement.querySelector('p').innerText;
    // console.log(removeNoteFromSession);
    deleteFromSessionStorage(removeNoteFromSession);

    removeElement.remove();  
    let notes=getParsedNotesFromSessionStorage();
    if(!notes.length){
        nothingToPreviewText.classList.remove("notActive");
    } 
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
    createNotePopUP.classList.remove("active");
    nothingToPreviewText.classList.add("notActive");
    
    title.value="";
    description.value="";
});

create.addEventListener("click",()=>{
    

    createNotePopUP.classList.add("active");
})
closebtn.addEventListener("click",()=>{
    
    createNotePopUP.classList.remove("active");
})
