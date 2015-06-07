export default class Dispatcher {
  register(callback) {
    callbacks.push(callback);
    return callbacks.length - 1;
  }

  dispatch(payload) {
    callbacks.forEach(function(callback) {
      addPromise(callback, payload);
    });
    
    Promise.all(promises).then(clearPromises);
  }
}

var callbacks  = [];
var promises   = [];

function addPromise(callback, payload) {
  promises.push(new Promise(function(resolve, reject) {
    if (callback(payload)) {
      resolve(payload);
    } else {
      reject(new Error("Dispatcher callback unsuccessful"));
    }
  }));
}

function clearPromises() {
  promises = [];
}
