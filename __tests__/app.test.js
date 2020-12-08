const request = require('supertest');
const app = require('../server');

describe('app test', () => {
  it('responds with hello world', () => {
    return request(app)
      .get('/')
      .then(res => {
        expect(res.text).toEqual('hello');
      });
  });
});
