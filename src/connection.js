import mysql from 'mysql';

const connection = mysql.createConnection({
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

try {
    const createRecordsTableQuery = `
    CREATE TABLE IF NOT EXISTS records_collection (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        type VARCHAR(255) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
    `;
    await connection.query(createRecordsTableQuery);
    console.log('Table records_collection created successfully');
} catch (error) {
    console.error('Error creating records table:', error);
}

export default connection;
