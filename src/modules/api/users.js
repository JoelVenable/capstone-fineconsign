import { Endpoint, baseURL } from './Endpoint';

const endpoint = new Endpoint(`${baseURL}/users`);


export const users = {
  create: obj => endpoint.create(obj),
  getAll: () => endpoint.getAll(),
  edit: (id, newParams) => endpoint.update(id, newParams),
  delete: id => endpoint.delete(id),
  //  TODO:  replace plaintext passwords in database with real auth.
  login: async (username, password) => {
    const userArray = await endpoint.getAll(`?username=${username}&password=${password}`);
    if (userArray.length) return userArray[0];
    throw new Error('Login error!  No users found with that username/password.');
  },
};
