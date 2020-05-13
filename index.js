/*

    P5js Project Generator v1.0.0
    
    Instead of going to the P5js getting started page every time,
    run this module, provide a path to a directory, and a new directory
    will be created with an index.html file, sketch.js, the most recent
    of version of P5js and some boilerplate code to allow for debugging
    and printing test info to the canvas.


*/

const fs = require('fs');
const { prompt } = require('enquirer');

let directoryPath;

//Get the directory flag
//Check to see if the user included a path argument when running module

if (process.argv[2]) {

    console.log("Thanks");
    directoryPath = process.argv[2];

} else {
    console.log("You forgot something");
    prompt([
        {
            name: "name",
            type: "input",
            message: "Name of your project: "
        },
        {
            type: "input",
            name: "directory",
            message: "Path to directory where your project should be set up: "
        }
    ])
    .then(res => {

        //Test to see if the directory property is in fact a valid directory
        fs.opendir(res.directory, (err, dir) => {
            
            if (err) {
                console.log(err);
            } else {

                const dirname = `${res.directory}/${res.name}`;
                fs.mkdir(dirname, (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(`\n\nThe directory: '${dirname}' was created\n\n`);
                        populateDirectory(dirname);
                    }
                });
            }
        })

    })
    
    populateDirectory = (dir) => {

        //Create the assets directory
        fs.mkdir(`${dir}/assets`, (err) => {

            if (err) {
                console.log(err);
            } else {

                //Reac the files from this p5_files dir
                fs.readdir('./p5_files', (read_err, files) => {
                    if (err) {
                        console.log(read_err);
                    } else {
                        for (let file of files) {
                            fs.copyFile(`./p5_files/${file}`, `${dir}/${file}`, (copy_err) => {
                                if (err) {
                                    console.log(`\n\nFile: ${file} did not copy`);
                                    console.log(copy_err);
                                }
                            });
                        }
                    }
                })
                
            }

        })
        

    }
    
}