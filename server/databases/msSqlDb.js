const mssql = require('mssql');
dbConfig = require('./config');

const config = {
    user: dbConfig.user,
    password: dbConfig.password,
    server: dbConfig.server,
    port: dbConfig.port,
    database: dbConfig.database,
    options: dbConfig.options,
    pool: dbConfig.pool,
    parseJSON: true
};

class msSqlDb {
    constructor() {
    }

    async getConnection() {
        return await new mssql.ConnectionPool(config)
            .connect()
            .then(conn => {
                console.log('mssSql 连接成功');
                return conn;
            })
            .catch(err => {
                console.log(err);
            })
    }

    async getData() {
        return await this.getConnection()
            .then(conn => {
                return conn.request().query`select * from userSafe`
            })
            .then(result => {
                console.log('查询成功');
                return result;
            })
            .catch(err => {
                console.log(err);
            })
    }
}

module.exports = new msSqlDb;