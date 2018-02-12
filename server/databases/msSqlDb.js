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

    async getLoginData(option) {
        return await this.getConnection()
            .then(conn => {
                const sql = `select * from userSafe where userName = ${option.name}`;
                return conn.request().query(sql);
            })
            .then(result => {
                console.log('查询成功');
                return result.recordset[0];
            })
            .catch(err => {
                console.log('查无此人');
                return false;
            })
    }
}

module.exports = new msSqlDb;
