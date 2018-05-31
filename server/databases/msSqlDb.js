const mssql = require('mssql');
dbConfig = require('../config/dbConfig');

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
                console.log('msSql 连接成功');
                return conn;
            })
            .catch(err => {
                console.log(err);
            })
    }

    /**
     * sql语句自由查询
     */
    async querySql(sql, params) {
        let conn = await this.getConnection();
        console.log('querySql:' + sql);
        let ps = new mssql.PreparedStatement(conn);
        if (params) {
            for (let index in params) {
                if (typeof params[index] === 'number') {
                    ps.input(index, mssql.Int);
                } else if (typeof params[index] === 'string') {
                    ps.input(index, mssql.NVarChar);
                }
            }
        }
        let ret = {
            err: null,
            rows: null,
            rowSize: 0
        };
        return new Promise(function (resolve, reject) {
            ps.prepare(sql, function (err) {
                if (err) {
                    ret.err = err;
                    resolve(ret);
                }
                else {
                    ps.execute(params, function (err, record) {
                        if (err) {
                            ret.err = err;
                            resolve(ret);
                        } else {
                            ps.unprepare(function (err) {
                                if (err) {
                                    ret.err = err;
                                    resolve(ret);
                                } else {
                                    ret.err = err;
                                    ret.rows = record.recordset || [];
                                    ret.rowSize = record.rowsAffected;
                                    resolve(ret);
                                }
                            });
                        }
                    });
                }
            });
        });

    };

    async getLoginData(option) {
        return await this.getConnection()
            .then(conn => {
                const sql = `select * from [dbo].[user] where userName = '${option.name}'`;
                console.log(sql);
                return conn.request().query(sql);
            })
            .then(result => {
                console.log('查询成功');
                return result.recordset[0];
            })
            .catch(err => {
                console.log(err);
                return false;
            })
    }

    /**
     * 添加数据
     * @param {options} options
     * options.tableName,查询的表名
     * options.params 参数。
     */
    add(options) {
        let tableName = options.tableName;
        let params = options.params || '';
        let sql = 'INSERT INTO ' + tableName + '(';
        let val = '';
        if (params) {
            for (let index in params) {
                sql += index + ',';
                val += `'${params[index]}',`
            }
            sql = sql.substring(0, sql.length - 1) + ') VALUES(';
            sql = sql + val.substring(0, val.length - 1) + ')';
            return this.querySql(sql, params);
        }
        else {
            return '';
        }
    }

    update(options) {
        let tableName = options.tableName;
        let whereSql = options.whereSql || '';
        let params = options.params || '';
        let sql = 'UPDATE ' + tableName + ' SET ';
        if (params) {
            for (let index in params) {
                sql += index + " = '" + params[index] + "',";
            }
            sql = sql.substring(0, sql.length - 1);
            if (whereSql) {
                sql += ' WHERE ' + whereSql;
            }
            return this.querySql(sql, params);
        }
        else {
            return '';
        }
    }

    findAll(options) {
        let displayColumns = options.displayColumns || '*';
        let tableName = options.tableName;
        let whereSql = options.whereSql || '';
        let params = options.params || '';
        let sql = 'SELECT ' + displayColumns + ' FROM ' + tableName;
        if (whereSql) {
            sql += ' WHERE ' + whereSql;
        }
        return this.querySql(sql, params);
    }
}

module.exports = new msSqlDb;
