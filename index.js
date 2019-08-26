#!/usr/bin/env node

// import axios
const axios = require('axios');
// import the country-list with this functions
const {
    getCode,
    getName
} = require('country-list');
// import the loading "function"/animation
const ora = require('ora');
// import the thing that can chose the color in the command line
const chalk = require('chalk');
// imort the thing that can write the title
var figlet = require('figlet');

// variables
let country = "";
let year = "";

// write the big title ( need to change it into a promess)
figlet(`Holidays`, function (err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
});

//Get the arguments we need (2 {country} and 3 {year})
process.argv.forEach((val, index) => {
    if (index === 2) {
        country = val;
    } else if (index === 3) {
        year = val;
    }
});

countryID = getCode(country); // get the code of the country
if (year === "") { // If the user don't give a year
    year = new Date().getFullYear();
}

// if the country isn't correct
if (countryID != undefined) {
    // start the little loading animation
    const spinner = ora('Loading unicorns').start();

    // let a little delay before the axios request (just to admire the loading animation)
    setTimeout(rqtAxios, 5000);

    function rqtAxios() {
        // AXIOS request
        let url = `https://date.nager.at/api/v2/publicholidays/${year}/${countryID}`;
        axios({
                method: 'get',
                url: url
            })
            .then(function (response) {
                // Sucess
                // Stop the loading animation
                spinner.stop();
                // Display the list of element {date - name}
                for (let i = 0; i < response.data.length; i++) {
                    // chalk.blue put in blue the text
                    let text = `${chalk.blue(response.data[i].date)} - ${chalk.red(response.data[i].localName)}`;
                    console.log(text);
                }
            }).catch(function (response) {
                // Error
                console.log("error");
                console.log(response.status);
            });
    }
}