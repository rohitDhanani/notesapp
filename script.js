const title=document.getElementById("title")
const addbtn=document.getElementById("addbtn")
const sectionDisplayNotes=document.getElementById("displayNotes");
const description=document.getElementById("description")
const dueDate=document.getElementById("dueDate")
const importance=document.getElementById("importance")
const create=document.getElementById("create")
const closebtn=document.getElementById("close")
const viewClosebtn=document.getElementById("viewClose")
const createNotePopUP = document.getElementById("createNotePopUP")
const nothingToPreviewText=document.getElementById("nothingToPreview")
const viewNotePopUP = document.getElementById("viewNotePopUP")
const viewNoteTitle=document.getElementById("viewNoteTitle")
const viewNoteDescription=document.getElementById("viewNoteDescription")
const viewNoteDueDate=document.getElementById("viewNoteDueDate")
const viewNoteImportance=document.getElementById("viewNoteImportance")

const searchBar=document.getElementById("searchBar")


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
            
            addNote(note.notetitle,note.notedueDate,note.noteimportance);
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
const createEditBtnAndEvent=()=>{
    const editBtn= document.createElement("button");
    editBtn.innerText="Edit";
    editBtn.classList.add("editBtn")
    editBtn.addEventListener("click",()=>{
        
     const editElement=event.target.parentElement
     const editNoteTitle=editElement.querySelector('p').innerText;
     let notes=getParsedNotesFromSessionStorage();
     let noteToBeEdited=notes.filter((el)=>{return el.notetitle==editNoteTitle});
    //  console.log(noteToBeEdited);
     title.value=noteToBeEdited[0].notetitle;
     description.value=noteToBeEdited[0].notedescription;
     dueDate.value=noteToBeEdited[0].notedueDate;
     importance.value=noteToBeEdited[0].noteimportance;
     createNotePopUP.classList.add("active");
     deleteFromSessionStorage(editNoteTitle);
      editElement.remove()

     // console.log(removeNoteFromSession);
    //  editFromSessionStorage(editNoteFromSession);
            });
            return editBtn;
    
    }
const createViewBtnAndEvent=()=>{
        const viewBtn= document.createElement("button");
        viewBtn.innerText="View";
        viewBtn.classList.add("viewBtn")
        viewBtn.addEventListener("click",()=>{
            
         const viewElement=event.target.parentElement
         const NoteTitle=viewElement.querySelector('p').innerText;
         let notes=getParsedNotesFromSessionStorage();
         let noteToBeViewed=notes.filter((el)=>{return el.notetitle==NoteTitle});
        
        viewNoteTitle.innerText=noteToBeViewed[0].notetitle;
        viewNoteDescription.innerText=noteToBeViewed[0].notedescription;
        viewNoteDueDate.innerText=noteToBeViewed[0].notedueDate;
        viewNoteImportance.innerText=noteToBeViewed[0].noteimportance;
         viewNotePopUP.classList.add("active");
                });
                return viewBtn;
        
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

const createDivTagAndInsertElements=(titleTag,dueDateTag,importanceTag,deleteBtn,editBtn,viewBtn)=>{
    let div=document.createElement("div")
    div.appendChild(titleTag)
    // div.appendChild(descriptionTag)
    div.appendChild(dueDateTag)
    div.appendChild(importanceTag)
    div.appendChild(viewBtn)
    div.appendChild(editBtn)
    div.appendChild(deleteBtn)
    return div;
}

const addNote=(title,dueDate,importance)=>{  
    if(title.length){
    // const note=document.createElement("p");
    // note.innerText=value;
    
    const titleTag=createParagraphAndInsertValue(title)
    const descriptionTag=createParagraphAndInsertValue(description)
    const dueDateTag=createParagraphAndInsertValue(dueDate)
    const importanceTag=createParagraphAndInsertValue(importance)

    // const wrapperDiv=document.createElement("div");
    const deleteBtn=createDeleteBtnAndEvent();
    const editBtn=createEditBtnAndEvent();
    const viewBtn=createViewBtnAndEvent();
    const wrapperDiv=createDivTagAndInsertElements(titleTag,dueDateTag,importanceTag,deleteBtn,editBtn,viewBtn);
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
    addNote(title.value.toUpperCase(),dueDate.value,importance.value);
    createNotePopUP.classList.remove("active");
    nothingToPreviewText.classList.add("notActive");
    
    title.value="";
    description.value="";
});
// document.addEventListener("click",(event)=>{
//     if(event.target.innerText=="Delete"){
//         console.log("clicked on delete btn");
//         return;
//     }
//     console.log("clicked on document",event.target);
// })

create.addEventListener("click",()=>{
    

    createNotePopUP.classList.add("active");
})
closebtn.addEventListener("click",()=>{
    
    createNotePopUP.classList.remove("active");
})
viewClosebtn.addEventListener("click",()=>{
    
    viewNotePopUP.classList.remove("active");
})

searchBar.addEventListener("input",()=>{
    let searchText=searchBar.value.toLowerCase();
    let box=document.querySelectorAll(".box")

    box.forEach((element)=>{
        let title=element.querySelector("p").innerText.toLowerCase();
        if(title.includes(searchText)){
            element.style.display=""
        }else{
            element.style.display="none"
        }
    })
    
})
