import express from 'express';
import apiController from '../controllers/api.controller.js';
import collectionsController from '../controllers/collections.controller.js';
import entitiesController from '../controllers/entities.controller.js';

const router = express.Router();

// Collections/table related routes
router.get('/collections', collectionsController.getCollections);
router.post('/collection', collectionsController.createCollection);
router.put('/collection', collectionsController.updateCollection);
router.get('/collection/:table', collectionsController.getCollectionData);

// Entities/Data related routes
router.get('/collection/entities/:name', entitiesController.getCollection);

export default router;
