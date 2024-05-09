import express from 'express';
import { fileURLToPath } from 'url';
import * as path from 'path';
import adminRoutes from './src/admin/app.js';

// Constants
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.set('views', path.join(__dirname, 'src', 'admin', 'views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/css', express.static(path.join(__dirname, 'public', 'css')));
app.use('/js', express.static(path.join(__dirname, 'public', 'js')));

// Routes
app.use('/admin', adminRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is listening at : http://localhost:${process.env.PORT}`)
});
