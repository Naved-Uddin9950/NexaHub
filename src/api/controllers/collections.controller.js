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


const collectionsController = {
    // Gets the collections list
    async getCollections(req, res) {
        try {
            const query = "SELECT * FROM records_collection WHERE type = 'table'";
            let collections = [];
            connection.query(query, (err, result, fields) => {
                if (err) {
                    console.error('Error executing query:', err);
                    res.status(500).json({ error: 'Error executing query' });
                    return;
                }
                for (let i = 0; i < result.length; i++) {
                    let name = result[i].name;
                    collections.push(name);
                }
                res.status(200).json({ collections });
            });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Error occurred' });
        }
    },

    // Creates a new collection in database
    async createCollection(req, res) {
        const { table, ...columns } = req.body;

        const columnDefinitions = Object.values(columns).map(col => {
            let columnDef = `${col.name} ${col.type}`;
            if (col.default && col.key != 'primary') {
                columnDef += ` DEFAULT ${col.default}`;
            }
            if (col.key === 'primary') {
                columnDef += ' PRIMARY KEY';
            } else if (col.key === 'unique') {
                columnDef += ' UNIQUE';
            }
            return columnDef;
        }).join(', ');

        const createTableQuery = `
                CREATE TABLE IF NOT EXISTS ${table} (
                    ${columnDefinitions}
                )
            `;

        try {
            const { results, fields } = await queryAsync(createTableQuery);
            res.status(200).json({ message: 'Table created successfully' });
            insertRecord(table, 'table');
        } catch (err) {
            console.error('Error creating table: ' + err.stack);
            res.status(500).json({ error: 'Error creating table' });
        }
    },

    // Updates the existing table in the database (finds table name first)
    async updateCollection(req, res) {
        const { table, ...columns } = req.body;

        try {
            // Get existing column names from the table
            const existingColumnsQuery = `DESCRIBE ${table}`;
            const existingColumnsResult = await queryAsync(existingColumnsQuery);
            const existingColumnNames = existingColumnsResult.results.map(column => column.Field);

            for (const [columnName, columnData] of Object.entries(columns)) {
                if (columnName === 'table') continue;

                // let alterQuery = '';
                if (existingColumnNames.includes(columnData.name)) {
                    let alterQuery = '';

                    alterQuery = `ALTER TABLE ${table} MODIFY COLUMN ${columnData.name} ${columnData.type}`;
                    if (columnData.default !== null && columnData.default !== undefined) {
                        alterQuery += ` DEFAULT ${columnData.default}`;
                    }
                    if (columnData.key === 'primary') {
                        alterQuery += ' PRIMARY KEY';
                    } else if (columnData.key === 'unique') {
                        alterQuery += ' UNIQUE';
                    }

                    // console.log(`Generated SQL query: ${alterQuery}`);
                    await queryAsync(alterQuery);
                    // console.log(`Altered table ${table}: ${alterQuery}`);
                }

                if (!existingColumnNames.includes(columnData.name)) {
                    let alterQuery = '';

                    alterQuery = `ALTER TABLE ${table} ADD COLUMN ${columnData.name} ${columnData.type}`;
                    if (columnData.default !== null && columnData.default !== undefined) {
                        alterQuery += ` DEFAULT ${columnData.default}`;
                    }
                    if (columnData.key === 'primary') {
                        alterQuery += ' PRIMARY KEY';
                    } else if (columnData.key === 'unique') {
                        alterQuery += ' UNIQUE';
                    }

                    // console.log(`Generated SQL query: ${alterQuery}`);
                    await queryAsync(alterQuery);
                    // console.log(`Altered table ${table}: ${alterQuery}`);
                }
            }


            console.log('Table updated successfully');
            res.status(200).json({ message: 'Table updated successfully' });
        } catch (err) {
            console.error('Error updating table: ' + err.stack);
            res.status(500).json({ error: 'Error updating table' });
        }
    },
}



export default collectionsController;