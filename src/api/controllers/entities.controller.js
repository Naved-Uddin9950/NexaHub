import connection from '../../connection.js';

const entitiesController = {
    // Get contents/data of a table by table name
    async getCollection(req, res) {
        try {
            const table = req.params.table;
            const query = `SELECT * FROM ${table}`;
            await queryAsync(query);
        } catch (error) {
            res.error('Error fetching table contents', error);
        }
    }
}

export default entitiesController;



