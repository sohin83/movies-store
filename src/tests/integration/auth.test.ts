
import request from 'supertest';
import { Genre } from '../../models/genre';
import { User } from '../../models/user';
import server from '../../index';
import mongoose from 'mongoose';

describe('auth middleware', () => {
    afterAll(async () => {  
        await server.close();
        await mongoose.disconnect();
    });
  
    afterEach(async () => { 
        await Genre.deleteMany({});
        await User.deleteMany({});
    });

  let token: string; 

  const exec = () => {
    return request(server)
      .post('/api/genres')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'genre1' });
  }

  beforeEach(() => {
    token = new User().generateAuthToken();
  });

  it('should return 401 if no token is provided', async () => {
    token = '';
    const res = await exec();
    expect(res.status).toBe(401);
  });

  it('should return 400 if token is invalid', async () => {
    token = 'a'; 
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it('should return 200 if token is valid', async () => {
    const res = await exec();
    expect(res.status).toBe(200);
  });
});