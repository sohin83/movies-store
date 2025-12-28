import moment from 'moment';
import request from 'supertest';
import { IRental, IMovie } from '../../interfaces';
import { Rental } from '../../models/rental';
import { Movie } from '../../models/movie';
import { User } from '../../models/user';
import mongoose from 'mongoose';
import server from '../../index';

describe('/api/returns', () => {
   let customerId: mongoose.Types.ObjectId | string;
   let movieId: mongoose.Types.ObjectId | string;
   let rental: IRental;
   let movie: IMovie;
   let token: string;

   const exec = () => {
      return request(server)
         .post('/api/returns')
         .set('Authorization', `Bearer ${token}`)
         .send({ customerId, movieId });
   };

   afterAll(async () => {
      await server.close();
      await mongoose.disconnect();
   });
   beforeEach(async () => {
      customerId = new mongoose.Types.ObjectId();
      movieId = new mongoose.Types.ObjectId();
      token = new User().generateAuthToken();

      movie = new Movie({
         _id: movieId,
         title: '12345',
         dailyRentalRate: 2,
         genre: { name: '12345' },
         numberInStock: 10,
      });
      await movie.save();

      rental = new Rental({
         customer: {
            _id: customerId,
            name: '12345',
            phone: '12345',
         },
         movie: {
            _id: movieId,
            title: '12345',
            dailyRentalRate: 2,
         },
      });
      await rental.save();
   });

   afterEach(async () => {
      await server.close();
      await Rental.deleteMany({});
      await Movie.deleteMany({});
   });

   it('should return 401 if client is not logged in', async () => {
      token = '';

      const res = await exec();

      expect(res.status).toBe(401);
   });

   it('should return 400 if customerId is not provided', async () => {
      customerId = '';

      const res = await exec();

      expect(res.status).toBe(400);
   });

   it('should return 400 if movieId is not provided', async () => {
      movieId = '';

      const res = await exec();

      expect(res.status).toBe(400);
   });

   it('should return 404 if no rental found for the customer/movie', async () => {
      await Rental.deleteMany({});

      const res = await exec();

      expect(res.status).toBe(404);
   });

   it('should return 400 if return is already processed', async () => {
      rental.dateReturned = new Date();
      await rental.save();

      const res = await exec();

      expect(res.status).toBe(400);
   });

   it('should return 200 if we have a valid request', async () => {
      const res = await exec();

      expect(res.status).toBe(200);
   });

   it('should set the returnDate if input is valid', async () => {
      const res = await exec();

      const rentalInDb = await Rental.findById(rental._id);
      //@ts-ignore
      const diff = new Date() - rentalInDb.dateReturned;
      expect(diff).toBeLessThan(10 * 1000);
   });

   it('should set the rentalFee if input is valid', async () => {
      rental.dateOut = moment().add(-7, 'days').toDate();
      await rental.save();

      const res = await exec();

      const rentalInDb = await Rental.findById(rental._id);
      //@ts-ignore
      expect(rentalInDb.rentalFee).toBe(14);
   });

   it('should increase the movie stock if input is valid', async () => {
      const res = await exec();

      const movieInDb = await Movie.findById(movieId);
      //@ts-ignore
      expect(movieInDb.numberInStock).toBe(movie.numberInStock + 1);
   });

   it('should return the rental if input is valid', async () => {
      const res = await exec();

      const rentalInDb = await Rental.findById(rental._id);

      expect(Object.keys(res.body)).toEqual(
         expect.arrayContaining([
            'dateOut',
            'dateReturned',
            'rentalFee',
            'customer',
            'movie',
         ])
      );
   });
});
