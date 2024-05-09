import express from 'express';
import { APP } from './constents.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('signup', { APP });
});

router.get('/dashboard', (req, res) => {
    res.render('dashboard', { APP })
});

export default router;
