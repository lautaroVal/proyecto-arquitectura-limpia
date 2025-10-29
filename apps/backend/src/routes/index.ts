import { Router } from 'express';
import authRoutes from './auth.js';
import productRoutes from './product.js'; 
import orderRoutes from './order.js';

const router = Router();

router.use('/api/auth', authRoutes);
router.use('/api/products', productRoutes);
router.use('/api/orders', orderRoutes);

export default router;
