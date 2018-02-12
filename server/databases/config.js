const dbConfig = {
    user: 'mgmt-admin',
    password: '123456',
    server: 'localhost',
    port: 1433,
    database: 'BugManagementSystem',
    options: {
        encrypt: true // Use this if you're on Windows Azure
    },
    pool: {
        min: 0,
        max: 10,
        idleTimeoutMillis: 3000
    }
};

module.exports = dbConfig;
