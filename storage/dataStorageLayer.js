const { getAllFromStorage, getFromStorage, addToStorage, updateStorage, removeFromStorage } = require("./storageLayer");
const { CODES, MESSAGES } = require("./statusCodes");
module.exports = class Datastorage {
  get CODES() {
    return CODES;
  }
  getAll() {
    return getAllFromStorage();
  }

  getOne(customerId) {
    return new Promise(async (resolve, reject) => {
      if (!customerId) {
        reject(MESSAGES.NOT_FOUND(customerId));
      } else {
        const result = await getFromStorage(customerId);
        if (result) {
          resolve(result);
        } else {
          reject(MESSAGES.NOT_FOUND(customerId));
        }
      }
    });
  }
  insert(customer){
    return new Promise(async (resolve,reject)=>{
        if(customer){
            if(!customer.customerId){
                reject(MESSAGES.NOT_INSERTED());
            }
            else if(await getFromStorage(customer.customerId)){
                reject(MESSAGES.ALREADY_IN_USE(customer.customerId))
            }
            else if(await addToStorage(customer)){
                resolve(MESSAGES.INSERT_OK(customer.customerId))
            }
            else{
                reject(MESSAGES.NOT_INSERTED());
            }
        }
        else{
            reject(MESSAGES.NOT_INSERTED());
        }
    });
} 
update(customer){
  return new Promise(async (resolve,reject)=>{
      if(customer){
          if(await updateStorage(customer)){
              resolve(MESSAGES.UPDATE_OK(customer.customerId));
          }
          else{
              reject(MESSAGES.NOT_UPDATED());
          }
      }
      else{
          reject(MESSAGES.NOT_UPDATED());
      }
  });
} //end update

remove(customerId){
  return new Promise(async (resolve,reject)=>{
      if(!customerId){
          reject(MESSAGES.NOT_FOUND('---empty---'));
      }
      else if(await removeFromStorage(customerId)){
          resolve(MESSAGES.REMOVE_OK(customerId));
      }
      else{
          reject(MESSAGES.NOT_REMOVED(customerId));
      }
  });
} //end of remove


};
