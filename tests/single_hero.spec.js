const request = require('supertest');
const app = require('../server');

describe('Single Hero Endpoint', () => {
  it('should return hero simple info', async () => {
    const res = await request(app)
      .get('/heroes/1')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect(200);

    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('name');
    expect(res.body).toHaveProperty('image');
  });
  it('should return hero advanced info', async () => {
    const res = await request(app)
      .get('/heroes/1')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Name', 'hahow')
      .set('Password', 'rocks')
      .expect(200);

    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('name');
    expect(res.body).toHaveProperty('image');
    expect(res.body).toHaveProperty('profile');
  });
});