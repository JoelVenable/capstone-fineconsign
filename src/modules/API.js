const myDB = 'http://localhost:8088';

export const API = {
  organizations: new Endpoint(`${myDB}/organizations`),
  users: new Endpoint(`${myDB}/users`),
  storageLocations: new Endpoint(`${myDB}/storageLocations`),
  storageBins: new Endpoint(`${myDB}/storageBins`),
  inventoryItems: new Endpoint(`${myDB}/inventoryItems`),
  requisitionItems: new Endpoint(`${myDB}/requisitionItems`),
  requisition: new Endpoint(`${myDB}/requisition`),
  unitConversions: new Endpoint(`${myDB}/unitConversions`),
  merchants: new Endpoint(`${myDB}/merchants`),
  merchantSKUs: new Endpoint(`${myDB}/merchantSKUs`),
  order: new Endpoint(`${myDB}/order`),
  orderItems: new Endpoint(`${myDB}/orderItems`),
};

function checkAndParseResponse(response) {
  if (response.status === 404) {
    throw new Error('404 error.  Check your JSON file!');
  } else return response.json();
}

// eslint-disable-next-line
const catchError = error => console.log(error);

function Endpoint(url) {
  this.create = (obj) => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    })
      .then(checkAndParseResponse)
      .catch(catchError);
  };
  this.read = (params) => {
    let newURL = url;
    if (params) newURL += `/${params}`;
    return fetch(newURL)
      .then(checkAndParseResponse)
      .catch(catchError);
  };
  this.update = (id, object) => {
    fetch(`${url}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(object),
    })
      .then(checkAndParseResponse)
      .catch(catchError);
  };
  this.replace = (id, newObject) => {
    fetch(`${url}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newObject),
    })
      .then(checkAndParseResponse)
      .catch(catchError);
  };
  this.delete = (id) => {
    fetch(`${url}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch(catchError);
  };
}
