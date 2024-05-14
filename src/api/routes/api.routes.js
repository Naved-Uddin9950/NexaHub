import express from 'express';
import apiController from '../controllers/api.controller.js';

const router = express.Router();

router.get('/collections', apiController.getCollections);
router.post('/collection', apiController.createCollection);
router.put('/collection', apiController.updateCollection);

router.get('/collection/:name', apiController.getCollection);

export default router;
