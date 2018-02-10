const sql = require('mssql');

const config = {
    user: 'mgmt-admin',
    password: '123456',
    server: 'localhost',
    port: 1433,
    database: 'bug-management-system',
    options: {
        encrypt: true // Use this if you're on Windows Azure
    },
    pool: {
        min: 0,
        max: 10,
        idleTimeoutMillis: 3000
    }
};

const db = async function () {
    try {
        let pool = await sql.connect(config);
        let result1 = await pool.request()
            .query('select * from userSafe');

        console.dir(result1);
    } catch (err) {
        // ... error checks
    }
};

module.exports = db;
