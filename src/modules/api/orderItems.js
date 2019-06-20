import { Endpoint, baseURL } from './Endpoint';

const endpoint = new Endpoint(`${baseURL}/orderItems`);

//

export const orderItems = {
  create: obj => endpoint.create(obj),
  findExisting: (orderId, paintingId) => (
    endpoint.getAll(`?orderId=${orderId}&paintingId=${paintingId}`)),
  getAll: () => endpoint.getAll(),
  edit: (id, newParams) => endpoint.update(id, newParams),
  delete: id => endpoint.delete(id),
};
