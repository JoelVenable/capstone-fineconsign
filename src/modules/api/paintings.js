import { Endpoint, baseURL } from './Endpoint';

const endpoint = new Endpoint(`${baseURL}/paintings`);

//

export const paintings = {
  create: obj => endpoint.create(obj),
  getAll: () => endpoint.getAll(),
  edit: (id, newParams) => endpoint.update(id, newParams),
  delete: id => endpoint.delete(id),
};
