import { Endpoint, baseURL } from './Endpoint';

const endpoint = new Endpoint(`${baseURL}/orderItems`);

//

export const orderItems = {
  create: obj => endpoint.create(obj),
  getAll: () => endpoint.getAll(),
  edit: (id, newParams) => endpoint.update(id, newParams),
  delete: id => endpoint.delete(id),
};
