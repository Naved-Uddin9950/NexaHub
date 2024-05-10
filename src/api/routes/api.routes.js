import express from 'express';
import apiController from '../controllers/api.controller.js';

const router = express.Router();

router.post('/collection', apiController.createCollection);
router.put('/collection', apiController.updateCollection);

export default router;
