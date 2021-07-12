const mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'quanlybanvemaybay',
    connectionLimit: 50,
});

const pool_query = util.promisify(pool.query).bind(pool);

pool.getConnection(function(err, connection) {
  if (err) {
      console.log('Database connection failed!');
      throw err;
  } // not connected!
  else console.log('Database connection successful!');
});

module.exports = {
    load: sql => pool_query(sql),
    // load(sql) {
    //   console.log(pool_query(sql));
    //   return pool_query(sql);
    // },

    add: (entity, tableName) => pool_query(`insert into ${tableName} set ?`, entity),
    del: (condition, tableName) => pool_query(`delete from ${tableName} where ?`, condition),
    patch: (entity, condition, tableName) => pool_query(`update ${tableName} set ? where ?`, [entity, condition])


};