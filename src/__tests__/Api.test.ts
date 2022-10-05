import LotrAPI from '../client/LotrAPI';

describe('API Tests', () => {
  let instance: any;
  beforeAll(() => {
    instance = new LotrAPI();
  });

  test('Test books list', async () => {
    const books = await instance.getBook({ limit: 1 });
    expect(books).toEqual([{"_id": "5cf5805fb53e011a64671582", "name": "The Fellowship Of The Ring"}]);
  });
});
