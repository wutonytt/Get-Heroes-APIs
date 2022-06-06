const request = require('supertest');
const app = require('../server');

describe('List Heroes Endpoint', () => {
  it('should return heroes simple info', async () => {
    const res = await request(app)
      .get('/heroes')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect(200);
    expect(res.body.length).toEqual(4);
    res.body.map(
      hero => {
        expect(hero).toHaveProperty('id');
        expect(hero).toHaveProperty('name');
        expect(hero).toHaveProperty('image');
        expect(hero).not.toHaveProperty('profile');
      }
    );
  });
  it('should return heroes advanced info', async () => {
    const res = await request(app)
      .get('/heroes')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Name', 'hahow')
      .set('Password', 'rocks')
      .expect(200);
    expect(res.body.length).toEqual(4);
    res.body.map(
      hero => {
        expect(hero).toHaveProperty('id');
        expect(hero).toHaveProperty('name');
        expect(hero).toHaveProperty('image');
        expect(hero).toHaveProperty('profile');
      }
    );
  });
  it('should return 401 authentication error', async () => {
    await request(app)
      .get('/heroes')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Name', 'hahow')
      .set('Password', 'rockssss')
      .expect(401);
  });
});