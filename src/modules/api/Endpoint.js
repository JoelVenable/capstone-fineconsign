/*

The Endpoint constructor function is designed to shorten all the common Fetch API calls
made to the local database.  It is initialized with a url endpoint and returns an object
with the following methods:

{
  create(newObject)
  getAll()
  getOne(id)
  replace(id, newObject)  (PUT)
  update(id, newObject)   (PATCH)
  delete(id)
}


*/

export const baseURL = 'http://localhost:8088';

export function Endpoint(url) {
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

  this.getAll = params => fetch(url + (params || ''))
    .then(checkAndParseResponse)
    .catch(catchError);

  this.getOne = (id) => {
    fetch(`${url}/${id}`)
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
    })
      .then(checkAndParseResponse)
      .catch(catchError);
  };
}

function checkAndParseResponse(response) {
  if (response.status === 404) {
    throw new Error('404 error.  Check your JSON file!');
  } else return response.json();
}

function catchError(error) {
  // eslint-disable-next-line
  return console.log(error);
}
