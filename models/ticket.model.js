const db = require('../utils/db');

const TBL_TICKETS = 'tickets';

module.exports = {
  all() {
    return db.load(`select * from ${TBL_TICKETS}`);
  },

  async infoTicket(entity) {
    const rows = await db.load(`
    SELECT  
    t.id, t.seat_code, 
    u.id as 'customer_id', u.name as 'name_customer',
    f.id as 'flight_id', f.departure_time, f.arrival_time, f.duration, f.capacity, f.first_class_price, f.eco_class_price, 
    f.departure_airport_id, a1.name as 'name_departure_airport',f.arrival_airport_id, a2.name as 'name_arrival_airport'

    FROM tickets t 
    JOIN users u ON t.user_id = u.id
    JOIN flights f ON t.flight_id = f.id
    JOIN airports a1 ON f.departure_airport_id = a1.id
    JOIN airports a2 ON f.arrival_airport_id = a2.id

    where flight_id = '${entity.flight_id}' and seat_code = '${entity.seat_code}';
    `);
    if (rows.length === 0) {
      return null;
    }
    else {
      return rows[0];
    }

  },

  
};
