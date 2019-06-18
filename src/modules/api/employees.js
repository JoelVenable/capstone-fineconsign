import { Endpoint, baseURL } from './Endpoint';

const endpoint = new Endpoint(`${baseURL}/employees`);

//

export const employees = {
  create: obj => endpoint.create(obj),
  getAll: () => endpoint.getAll('?_expand=user'),
  getFromUserId: userId => endpoint.getAll(`?userId=${userId}`),
  edit: (id, newParams) => endpoint.update(id, newParams),
  delete: id => endpoint.delete(id),
};
