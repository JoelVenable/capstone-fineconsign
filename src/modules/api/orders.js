import { Endpoint, baseURL } from './Endpoint';

const endpoint = new Endpoint(`${baseURL}/orders`);

//

export const orders = {
  create: obj => endpoint.create(obj),
  getAll: () => endpoint.getAll('?_embed=orderItems'),
  getMine: customerId => endpoint.getAll(`?customerId=${customerId}`),
  getMyOpenCart: customerId => endpoint.getAll(`?customerId=${customerId}&isSubmitted=false&_embed=orderItems`)
    .then((results) => {
      if (results.length > 1) {
        /* eslint-disable-next-line */
        console.log('Warning, multiple carts found!');
      }

      if (results.length > 0) return results;
      return ['not found'];
    }),
  edit: (id, newParams) => endpoint.update(id, newParams),
  delete: id => endpoint.delete(id),
};
