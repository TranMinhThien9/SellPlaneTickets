const db = require('../utils/db');

const TBL_AIRPORTS = 'airports';

module.exports = {
  all() {
    return db.load(`select * from ${TBL_AIRPORTS}`);
  },

  async single(id) {
    const rows = await db.load(`select * from ${TBL_AIRPORTS} where id = ${id}`);
    if (rows.length === 0)
      return null;
    return rows[0];
  },
};
