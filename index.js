#!/usr/bin/env node

const axios = require('axios');
const {
    getCode,
    getName
} = require('country-list');
const ora = require('ora');

let country = "";
let year = "";
//récupération des paramètres
process.argv.forEach((val, index) => {
    if (index === 2) {
        country = getCode(val);
    } else if (index === 3) {
        year = val;
    }
});
if (year === "") { //si l'année n'est pas précisé
    year = new Date().getFullYear();
}

if (country != undefined) {
    //Requête AXIOS
    let url = `https://date.nager.at/api/v2/publicholidays/${year}/${country}`;
    console.log(url);
    axios({
            method: 'get',
            url: url
        })
        .then(function (response) {
            //Affichage de toutes les dates + nom
            for (let i = 0; i < response.data.length; i++) {
                let text = `${response.data[i].date} - ${response.data[i].localName}`;
                console.log(text);
            }
        }).catch(function (response) {
            console.log("error");
            console.log(response.status);
        });
}