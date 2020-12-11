const request = require('supertest');
const app = require('../lib/app');
const pool = require('../lib/utils/pool');
const fs = require('fs');
const CyberTruck = require('../lib/tesla/CyberTruck');

// ----------------------------------------

describe('app test', () => {

  beforeAll(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  afterAll(() => {
    return pool.end();
  });

  // ---------------------------------------


  test('post a new cybertruck', async() => {

    const post = {
      title: 'truck',
      descript: 'The Tesla Cybertruck is an all-electric, battery-powered, light duty truck announced by Tesla, Inc. Three models have been announced, with EPA range estimates of 250–500 miles (400–800 km) and an estimated 0–60 mph time of 2.9–6.5 seconds, depending on the model.',
      color: 'silver'
    };

    const expectation = {
      id: '1',
      title: 'truck',
      descript: 'The Tesla Cybertruck is an all-electric, battery-powered, light duty truck announced by Tesla, Inc. Three models have been announced, with EPA range estimates of 250–500 miles (400–800 km) and an estimated 0–60 mph time of 2.9–6.5 seconds, depending on the model.',
      color: 'silver'
    };

    const data = await request(app)
      .post('/tesla/cyber_truck')
      .send(post)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(data.body).toEqual(expectation);
  });
  
  // --------------------------------------


  test('gets all rows from cyber_trucks table', async() => {
  
    const expectation = [
      {
        id: '1',
        title: 'truck',
        descript: 'The Tesla Cybertruck is an all-electric, battery-powered, light duty truck announced by Tesla, Inc. Three models have been announced, with EPA range estimates of 250–500 miles (400–800 km) and an estimated 0–60 mph time of 2.9–6.5 seconds, depending on the model.',
        color: 'silver'
      }
    ];
  

    const data = await request(app) 
      .get('/tesla/cyber_truck/')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(data.body).toEqual(expectation); 
    
  });


  // -----------------------------------------------------

  test('get cybertruck by id', async() => { 

    const tesla = await CyberTruck.insert({
      id: '1',
      title: 'truck',
      descript: 'The Tesla Cybertruck is an all-electric, battery-powered, light duty truck announced by Tesla, Inc. Three models have been announced, with EPA range estimates of 250–500 miles (400–800 km) and an estimated 0–60 mph time of 2.9–6.5 seconds, depending on the model.',
      color: 'silver'
    });


    const response = await request(app)
      .get(`/tesla/cyber_truck/${tesla.id}`)
      .send({ 
        title: 'truck',
        descript: 'The Tesla Cybertruck is an all-electric, battery-powered, light duty truck announced by Tesla, Inc. Three models have been announced, with EPA range estimates of 250–500 miles (400–800 km) and an estimated 0–60 mph time of 2.9–6.5 seconds, depending on the model.',
        color: 'silver'
      });

    expect(response.body).toEqual({
      ...tesla,
      id: '2',
      title: 'truck',
      descript: 'The Tesla Cybertruck is an all-electric, battery-powered, light duty truck announced by Tesla, Inc. Three models have been announced, with EPA range estimates of 250–500 miles (400–800 km) and an estimated 0–60 mph time of 2.9–6.5 seconds, depending on the model.',
      color: 'silver'
    });
  });

  // //   -----------------------------------------------------

  test('delete a cybertruck', async() => {
    const expectation = {
      id: '1',
      title: 'truck',
      descript: 'The Tesla Cybertruck is an all-electric, battery-powered, light duty truck announced by Tesla, Inc. Three models have been announced, with EPA range estimates of 250–500 miles (400–800 km) and an estimated 0–60 mph time of 2.9–6.5 seconds, depending on the model.',
      color: 'silver'
    };

    const data = await request(app)
      .delete('/tesla/cyber_truck/1')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(data.body).toEqual(expectation);

  });

// END=======================================================
});
