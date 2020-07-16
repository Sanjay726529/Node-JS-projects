// imports
const fs = require('fs')


// function to load the notes file
const loadJsonfile =  () => {

    try {
        const notes = fs.readFileSync("notes.json")
        return JSON.parse(notes.toString())
    } catch (e) {
        return []
    }
}


// function to savenotes to notes.json file
const saveNotes = (notes) => {
    fs.writeFileSync('notes.json', JSON.stringify(notes))
}



// function to add the notes to notes.json file
const addNote = (title, body) => {

    // get the exising notes from json file
    const cur_notes = loadJsonfile()

    // check if the new note title is already present in the notes
    // const duplicateNotes = cur_notes.filter((note) => {
    //     return note.title === title
    // })
    const duplicateNotes = cur_notes.find((note) => note.title === title)

    // if duplicate notes list is empty
    if (!duplicateNotes) {

        // push the new note to array
        cur_notes.push({
            title: title,
            body: body
        })

        saveNotes(cur_notes)
        return true

    } else {
        // note title already exists
        console.log("Note title already Taken!! Try with new title name.\n")
        return false
    }  
}


// function to remove notes from database
const removeNote = function(title) {

    // get the exising notes from json file
    let cur_notes = loadJsonfile()

    len_before_del = cur_notes.length

    // get the notes except the given title
    cur_notes = cur_notes.filter((note) => {
        return note.title !== title
    })

    if (len_before_del != cur_notes.length) {
        // save notes
        saveNotes(cur_notes)
        return true
    } else {

        console.log("Cannot delete, Given note doesn't exist in the database. ")
        return false
    }

}


// list the existing notes by their title
const getNotes = function(title) {

   // get the exising notes from json file
   return loadJsonfile()

   
}

// read note content by its title
const readNote = function(title) {

    debugger
    
    // get the exising notes from json file
    const cur_notes = loadJsonfile()
 
    // get the notes except the given title
    notes = cur_notes.find((note) => note.title === title)
 
    return notes
 }





module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    readNote: readNote
}