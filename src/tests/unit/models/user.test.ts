import {User} from '../../../models/user';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

describe('user.generateAuthToken', () => {
  it('should return a valid JWT', () => {
    const payload = { 
      _id: new mongoose.Types.ObjectId().toHexString(), 
      isAdmin: true 
    };    
    const user = new User(payload);
    const token = user.generateAuthToken();
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    expect(decoded).toMatchObject(payload);
  });
});