const request = require('supertest');
const app = require('../lib/app');
const pool = require('../lib/utils/pool');
const fs = require('fs');

describe('app test', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });
  afterAll(() => {
    return pool.end();
  });
  it('new cybertruck', async() => {
    const response = await request(app)
      .post('/api/v1/tesla/cybertruck')
      .send({
        color: 'red',
        type: 'truck'
      });
    expect(response.body).toEqual({
      id: '1',
      color: 'red',
      type: 'truck'
    });
  });
});
