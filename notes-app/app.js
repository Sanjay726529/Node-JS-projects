// imports
const yargs = require("yargs")
const chalk = require("chalk")
const notes_util = require("./utils")




// use yargs to take commands and input to user
// note add, requires a title and body flag
yargs.command({

    command: 'add',                  // command name
    description: "Add a new note",   // description of the command
    builder:{                        // command options, two options
        title:{
            description: "Title Name",
            demandOption: true,
            type: String
        },
        body:{
            description: "content of the notes being created",
            type: String,
            demandOption: true
        }
    },

    handler: (argv) => {           // function to execute when command called
        console.log()
        console.log(chalk.bold.yellow("New Note '" + argv.title + "' is being added..\n"))

        status = notes_util.addNote(argv.title, argv.body)

        if (status) {
            console.log(chalk.inverse.bold.green("SUCCESS!!"))
        } else {
            console.log(chalk.inverse.bold.red("FAILED!!"))
        }
        
    }

})

// use yargs to remove a title
yargs.command({
    command: "remove",
    description: "Remove the note using title",
    builder: {
        title:{
            description: "Title name of Note to be removed",
            demandOption: true,
            type: String
        }
    },
    handler: (argv) => {
        console.log()
        console.log(chalk.bold.yellow("Removing...'" + argv.title + "'.."))

        status = notes_util.removeNote(argv.title)

        if (status) {
            console.log(chalk.inverse.bold.green("SUCCESS!!"))
        } else {
            console.log(chalk.inverse.bold.red("FAILED!!"))
        }

    }
})


// use yargs to list the existing notes titles
yargs.command({
    command: "list",
    description: "list the existing titles of notes",
    handler: () => {
        console.log()
        console.log(chalk.bold.yellow("Fetching existing note titles..."))

        titles = notes_util.getNotes()

        if (titles.length === 0) {
            console.log(chalk.inverse.bold.yellowBright("database is empty"))
        } else {
            console.log(chalk.inverse.bold.green("SUCCESS!!\n"))
            console.log("Notes: \n")
            titles.forEach((title,index) => {
                console.log((index+1) + ". " + title.title)
            })
        }

    }
})


// use yargs to read the content existing note by title
yargs.command({
    command: "read",
    description: "read the existing note by its title",
    builder: {
        title:{
            description: "Title name of Note to be read",
            demandOption: true,
            type: String
        }
    },
    handler: (argv) => {
        console.log()
        console.log(chalk.bold.yellow("Fetching the content of " + argv.title + "..."))

        note = notes_util.readNote(argv.title)

        if (!note) {
            console.log(chalk.bgRed("No such notes is present in database"))
        } else {
            console.log(chalk.inverse.bold.green("SUCCESS!!\n"))

            console.log(note.title + ":")
            console.log(note.body)

        }
    }
})

yargs.parse()



