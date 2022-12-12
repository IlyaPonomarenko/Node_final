const {
    getAllFromStorage,
    getFromStorage
} = require("./storageLayer");
const {CODES, MESSAGES} = require("./statusCodes")
module.exports = class Datastorage{
    getAll(){
        return getAllFromStorage();
    }
}