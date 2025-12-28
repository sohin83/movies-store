import express from 'express';
import { auth } from '../middleware/auth';
import { validateObjectId } from '../middleware/validateObjectId';
import {
   getCustomers,
   createCustomer,
   updateCustomer,
   deleteCustomer,
   getCustomerById,
} from '../controllers/customers.controller';

const router = express.Router();

router.get('/', ...auth, getCustomers);

router.post('/', ...auth, createCustomer);

router.put('/:id', ...auth, validateObjectId, updateCustomer);

router.delete('/:id', ...auth, validateObjectId, deleteCustomer);

router.get('/:id', ...auth, validateObjectId, getCustomerById);

export default router;
