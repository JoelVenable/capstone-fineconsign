import { Endpoint, baseURL } from './Endpoint';

const endpoint = new Endpoint(`${baseURL}/customers`);

//

export const customers = {
  create: obj => endpoint.create(obj),
  getAll: () => endpoint.getAll('&_embed=user'),
  getFromUserId: userId => endpoint.getAll(`?userId=${userId}`),
  edit: (id, newParams) => endpoint.update(id, newParams),
  delete: id => endpoint.delete(id),
};
