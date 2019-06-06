import { Endpoint, baseURL } from './Endpoint';

const endpoint = new Endpoint(`${baseURL}/inventoryItems`);

//

export const inventoryItems = {
  create: obj => endpoint.create(obj),
  getAll: () => endpoint.getAll(),
  edit: (id, newParams) => endpoint.update(id, newParams),
  delete: id => endpoint.delete(id),
};
