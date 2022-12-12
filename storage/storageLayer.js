"use strict"

const path = require("path");

const {key, adapterFile, storageFile} = require("./storageConfig.json")

const {readStorage, writeStorage} = require("./readerWriter")

const storageFilePath = path.join(__dirname, storageFile);
const {adapt} = require(path.join(__dirname, adapterFile));

async function getAllFromStorage(){
    return readStorage(storageFilePath)
}
async function getFromStorage(id){
    return (await readStorage(storageFilePath)).find(item => item[key]===customerId) || null;
}
module.exports ={
    getAllFromStorage,
    getFromStorage
}