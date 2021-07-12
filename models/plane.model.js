const db = require('../utils/db');

const TBL_PLANES = 'planes';

module.exports = {
  all() {
    return db.load(`select * from ${TBL_PLANES}`);
  },

  async single(id) {
    const rows = await db.load(`select * from ${TBL_PLANES} where id = ${id}`);
    if (rows.length === 0)
      return null;
    return rows[0];
  },
};
