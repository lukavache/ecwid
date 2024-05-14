import { Router } from 'express';
const router = Router();
import { getProducts, getProduct, exportProductsToCSV } from './controllers/product.controller';

router.get('/get-products', getProducts);
router.get('/get-product/:id', getProduct);
router.post('/export-products', exportProductsToCSV);

export default router;