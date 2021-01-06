const swifdog = require("swifdog")('max@mustermann.de', 'password');
const SimpleDateFormat = require('@riversun/simple-date-format');

function listProjects() {
    return new Promise(resolve => {
        swifdog.projects.list((err, response) => {
            if (err) throw err;
            else {
                resolve(response);
            }
        });
    });
}

listProjects().then(data => console.log(data));
