import express from 'express';
import { connectDB } from './src/connection.js';

const app = express();
const PORT = 3000;

connectDB();

app.get('/', (req, res) => {
    res.send('hi');
});

app.listen(PORT, () => {
    console.log(`Server is listening at : http://localhost:${PORT}`)
});
