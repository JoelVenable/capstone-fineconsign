import { Endpoint, baseURL } from './Endpoint';

const endpoint = new Endpoint(`${baseURL}/orders`);

//

export const orders = {
  create: obj => endpoint.create(obj),
  getAll: () => endpoint.getAll(),
  getMine: customerId => endpoint.getAll(`?customerId=${customerId}`),
  getMyOpenCart: customerId => endpoint.getAll(`?customerId=${customerId}&isSubmitted=false&_embed=orderItems`)
    .then((results) => {
      console.log('getOpenCart results:', results);
      /* eslint-disable-next-line */
      if (results.length > 1) {
        console.log('Warning, multiple carts found!');
      }

      if (results.length > 0) return results;
      return ['not found'];
    }),
  edit: (id, newParams) => endpoint.update(id, newParams),
  delete: id => endpoint.delete(id),
};
