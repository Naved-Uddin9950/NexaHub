import connection from '../../connection.js';

const queryAsync = (query) => {
    return new Promise((resolve, reject) => {
        connection.query(query, (err, results, fields) => {
            if (err) {
                reject(err);
            } else {
                resolve({ results, fields });
            }
        });
    });
};

// Insert row/data in records_collection table
const insertRecord = async (name, type) => {
    try {
        const insertRecordQuery = `
            INSERT INTO records_collection (name, type) 
            VALUES ('${name}', '${type}')
        `;
        await connection.query(insertRecordQuery, [name, type]);
        console.log()
        console.log('Record inserted successfully');
    } catch (error) {
        console.error('Error inserting record:', error);
    }
}

// Delete row/data in records_collection table
const deleteRecord = async (id) => {
    try {
        const deleteRecordQuery = `
            DELETE FROM records_collection WHERE id = ${id}
        `;
        await connection.query(deleteRecordQuery, [id]);

        console.log('Record deleted successfully');
    } catch (error) {
        console.error('Error deleting record:', error);
    }
}

const apiController = {

}

export default apiController;
