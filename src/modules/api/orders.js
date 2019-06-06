import { Endpoint, baseURL } from './Endpoint';

const endpoint = new Endpoint(`${baseURL}/orders`);

//

export const orders = {
  create: obj => endpoint.create(obj),
  getAll: () => endpoint.getAll(),
  edit: (id, newParams) => endpoint.update(id, newParams),
  delete: id => endpoint.delete(id),
};
