import { Endpoint, baseURL } from './Endpoint';

const endpoint = new Endpoint(`${baseURL}/stores`);

//

export const stores = {
  create: obj => endpoint.create(obj),
  get: () => endpoint.getOne(1),
  edit: (id, newParams) => endpoint.update(id, newParams),
  delete: id => endpoint.delete(id),
};
