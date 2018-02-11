const mssql = require('mssql');
dbConfig = require('./config');

const config = {
    user: dbConfig.user,
    password: dbConfig.password,
    server: dbConfig.server,
    port: dbConfig.port,
    database: dbConfig.database,
    options: dbConfig.options,
    pool: dbConfig.pool
};

class mssqldb {
    constructor() {
    }

    getConnection() {
        return new Promise(function (resolve, reject) {
            let conn = new mssql.ConnectionPool(config, function (err) {
                console.log('mssql Pool 创建');
                if (err) {
                    console.log('mssql err:' + err);
                    reject(err);
                } else {
                    console.log('mssql 连接成功');
                    resolve(conn);
                }
            })
        });
    }

    /**
     * 同一字段多值处理
     * @param {String} column 列名
     * @param {String} vals 用','分割的值
     * @return {ret}
     * ret.wStr 当前列的Where条件 String;
     * ret.params 生成的params参数 Obj;
     */
    setWhereStrAndParams(column, vals) {
        let ret = {
            wStr: '',
            params: {}
        };
        let arr = vals.split(',');
        let str = '';
        let p = {};
        for (let i = 0; i < arr.length; i++) {
            str += ' or ' + column + '=@' + column + i;
            p[column + i] = arr[i];
        }
        ret.wStr = str.substring(3, str.length);
        ret.params = p;
        return ret;
    }

    /**
     * 设置显示列表别名
     * @param {Object} ColumnsObjs
     * @return {String} DisplayColumnString
     */
    setDisplayColumns(ColumnObjs) {
        let dc = '';
        for (let index in ColumnObjs) {
            if (ColumnObjs[index] !== '') {
                dc += index + ' as ' + ColumnObjs[index] + ',';
            }
            else {
                dc += index + ',';
            }
        }
        if (dc.length > 0) {
            dc = dc.substring(0, dc.length - 1);
        }
        else {
            dc = '*';
        }
        return dc;
    }

    /**
     * sql语句自由查询
     * @param {SqlString} sql语句,sql语句中使用参数a=@a
     * @param {Object}  字段参数，如 {a:v,b:v}
     */
    async querySql(sql, params) {
        let conn = await this.getConnection();
        console.log('querySql:' + sql + '    ');
        let ps = new mssql.PreparedStatement(conn);
        if (params != '') {
            for (let index in params) {
                if (typeof params[index] == 'number') {
                    ps.input(index, mssql.Int);
                } else if (typeof params[index] == 'string') {
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
                        //console.log(ret.rows+'===='+JSON.stringify(record.recordset))
                        if (err) {
                            ret.err = err;
                            resolve(ret);
                        }
                        else {
                            ps.unprepare(function (err) {
                                if (err) {
                                    ret.err = err;
                                    resolve(ret);
                                }
                                else {
                                    ret.err = err;
                                    ret.rows = record.recordset;
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

    /**
     * @param {options} options
     * options.index 查询第几页
     * options.pageSize, 每页显示数
     * options.displayColumns, 需要显示列用","分隔，默认为*所有；
     * options.orderColumns,需要排序的列用","分隔，必须有一列
     * options.tableName,查询的表名
     * options.whereSql,条件sql ,如 a='' and b  不要用Order by 和group by
     * options.params 参数。
     */
    pageQuerySql(options) {//写sql语句自由查询
        let index = options.index || 1;
        let pageSize = options.pageSize || 20;
        let displayColumns = options.displayColumns || '*';
        let orderColumns = options.orderColumns;
        let tableName = options.tableName;
        let whereSql = options.whereSql || '';
        let params = options.params || '';
        let sql = 'SELECT TOP ' + pageSize + ' ' + displayColumns + ' FROM(SELECT ROW_NUMBER() OVER (ORDER BY ' + orderColumns + ') AS RowNumber,* FROM ' + tableName;
        if (whereSql != '') {
            sql += ' WHERE ' + whereSql;
        }
        sql += ') AS A WHERE RowNumber > ' + pageSize + '*(' + index + '-1) ';
        let ret = this.querySql(sql, params);
        return ret;
    }

    /**
     * 查询一条数据
     * @param {options} options
     * options.displayColumns, 需要显示列用","分隔，默认为*所有；
     * options.tableName,查询的表名
     * options.whereSql,条件sql ,如  a=1 and b=@b  不要用Order by 和group by
     * options.params 参数。
     */
    async findOne(options) {
        var displayColumns = options.displayColumns || '*';
        var tableName = options.tableName;
        var whereSql = options.whereSql || '';
        var params = options.params || '';
        var sql = 'SELECT  ' + displayColumns + ' FROM ' + tableName;
        if (whereSql != '') {
            sql += ' WHERE ' + whereSql;
        }
        var ret = await this.querySql(sql, params);
        ret.rows = ret.rows[0];
        return ret;
    }

    /**
     * 查询所有数据
     * @param {options} options
     * options.displayColumns, 需要显示列用","分隔，默认为*所有；
     * options.tableName,查询的表名
     * options.whereSql,条件sql ,如 a=1 and b=@b  不要用Order by 和group by
     * options.params 参数。
     */
    findAll(options) {
        let displayColumns = options.displayColumns || '*';
        let tableName = options.tableName;
        let whereSql = options.whereSql || '';
        let params = options.params || '';
        let sql = 'SELECT ' + displayColumns + ' FROM ' + tableName;
        if (whereSql != '') {
            sql += ' WHERE ' + whereSql;
        }
        let ret = this.querySql(sql, params);
        return ret;
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
        if (params != '') {
            for (var index in params) {
                sql += index + ',';
                val += '@' + index + ','
            }
            sql = sql.substring(0, sql.length - 1) + ') output inserted.ID VALUES(';
            sql = sql + val.substring(0, val.length - 1) + ')';
            let ret = this.querySql(sql, params);
            return ret;
        }
        else {
            return '';
        }
    }

    /**
     * 更新数据
     * @param {options} options
     * options.tableName,查询的表名
     * options.whereSql,条件sql ,如 a=1 and b=@b  不要用Order by 和group by
     * options.params 参数。
     */
    update(options) {
        let tableName = options.tableName;
        let whereSql = options.whereSql || '';
        let params = options.params || '';
        let sql = 'UPDATE ' + tableName + ' SET ';
        if (params != '') {
            for (let index in params) {
                let d = whereSql.indexOf('@' + index);
                if (d == -1) {
                    sql += index + '=@' + index + ',';
                }

            }
            sql = sql.substring(0, sql.length - 1);
            if (whereSql != '') {
                sql += ' WHERE ' + whereSql;
            }
            let ret = this.querySql(sql, params);
            return ret;
        }
        else {
            return '';
        }
    }

    /**
     * 删除数据
     * @param {options} options
     * options.tableName,查询的表名
     * options.whereSql,条件sql ,如 a=1 and b=@b  不要用Order by 和group by
     * options.params 参数。
     */
    del(options) {
        let tableName = options.tableName;
        let whereSql = options.whereSql || '';
        let params = options.params || '';
        let sql = 'DELETE FROM ' + tableName;
        if (params != '') {
            if (whereSql != '') {
                sql += ' WHERE ' + whereSql;
            }
            let ret = this.querySql(sql, params);
            return ret;
        }
        else {
            return '';
        }
    }

    /**
     * 软删除数据
     * @param {options} options
     * options.tableName,查询的表名
     * options.whereSql,条件sql ,如 a=1 and b=@b  不要用Order by 和group by
     * options.params 参数。
     */
    softdel(options) {
        let tableName = options.tableName;
        let whereSql = options.whereSql || '';
        let params = options.params || '';
        let sql = 'UPDATE ' + tableName + ' SET isDeleted=1';
        if (params != '') {
            if (whereSql != '') {
                sql += ' WHERE ' + whereSql;
            }
            let ret = this.querySql(sql, params);
            return ret;
        }
        else {
            return '';
        }
    }

    /**
     * 统计行数
     * @param {options} options
     * options.tableName,查询的表名
     * options.whereSql,条件sql ,如 a=1 and b=@b  不要用Order by 和group by
     * options.params 参数。
     */
    count(options) {
        let tableName = options.tableName;
        let whereSql = options.whereSql || '';
        let params = options.params || '';
        let sql = 'SELECT COUNT(1) AS size FROM ' + tableName;
        if (whereSql != '') {
            sql += ' WHERE ' + whereSql;
        }
        let ret = this.querySql(sql, params);
        ret.rows = ret.rows[0].size;
        return ret;
    }
}

module.exports = new mssqldb;