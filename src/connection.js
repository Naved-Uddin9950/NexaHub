import mysql from 'mysql';

export const connectDB = () => {
    var connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    connection.on('error', (err) => {
        console.error('Database connection error:', err);
    });

    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to MySQL server:', err);
            return;
        }
        console.log(`Database connected at : http://${process.env.DB_HOST}/phpmyadmin/index.php?route=/database/structure&db=${process.env.DB_NAME}`);
    });

    return connection;
}
