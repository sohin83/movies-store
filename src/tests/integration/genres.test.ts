import request from 'supertest';
import { Genre } from '../../models/genre';
import { User } from '../../models/user';
import server from '../../index';
import mongoose from 'mongoose';

describe('/api/genres', () => {
   afterAll(async () => {
      await server.close();
      await mongoose.disconnect();
   });

   afterEach(async () => {
      await Genre.deleteMany({});
   });

   describe('GET /', () => {
      console.log(process.env.NODE_ENV);
      it('should return all genres', async () => {
         await Genre.collection.insertMany([
            { name: 'genre1' },
            { name: 'genre2' },
         ]);

         const token = new User({
            isAdmin: false,
            name: 'Test User',
            email: 'test@test.com',
         }).generateAuthToken();

         const res = await request(server)
            .get('/api/genres')
            .set('Authorization', `Bearer ${token}`);

         expect(res.status).toBe(200);
         expect(res.body.length).toBe(2);
         expect(res.body.some((g: any) => g.name === 'genre1')).toBeTruthy();
         expect(res.body.some((g: any) => g.name === 'genre2')).toBeTruthy();
      });
   });
});
