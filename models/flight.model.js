const db = require('../utils/db');

const TBL_FLIGHTS = 'flights';

module.exports = {
  all() {
    return db.load(`select * from ${TBL_FLIGHTS}`);
  },

  airportFlight() {
    const sql = `
    SELECT  f.id, f.departure_time, f.arrival_time, f.duration, f.capacity, f.first_class_price, f.eco_class_price,
    f.plane_id, f.departure_airport_id, a1.name as 'name_departure_airport',f.arrival_airport_id, a2.name as 'name_arrival_airport'
    FROM flights f 
    JOIN airports a1 ON f.departure_airport_id = a1.id
    JOIN airports a2 ON f.arrival_airport_id = a2.id
    ORDER BY f.id;
    `;
    return db.load(sql);
  },

  async findFlight(entity) {
    function formatDay(timestamp) {
      var date = new Date(timestamp);
      var month = date.getMonth() + 1;
      var year = date.getFullYear();
      var day = date.getDate();
      return year + '/' + month + '/' + day;
    }
    const rows = await db.load(`
    SELECT  f.id, f.departure_time, f.arrival_time, f.duration, f.plane_id, f.capacity, p.num_of_fc_seats, p.num_of_eco_seats,
    f.first_class_price, f.eco_class_price, 
    f.departure_airport_id, a1.name as 'name_departure_airport',f.arrival_airport_id, a2.name as 'name_arrival_airport'
    FROM flights f 
    JOIN airports a1 ON f.departure_airport_id = a1.id
    JOIN airports a2 ON f.arrival_airport_id = a2.id
    JOIN planes p ON f.plane_id = p.id

    where departure_airport_id = '${entity.departure_airport_id}' and arrival_airport_id = '${entity.arrival_airport_id}';
    `);
    if (rows.length === 0) {
      return null;
    }
    else {
      for (let i = 0; i < rows.length; i++) {
        if (formatDay(entity.departure_time) !== formatDay(rows[i].departure_time)) {
          rows.splice(i, 1);
        }
        
      }
      if (rows.length === 0) {
        return null;
      }
      console.log('tại flight.model sau else:', rows)
      return rows
    }
  },

  FlightAirportPlane() {
    const sql = `
    SELECT  f.id, f.departure_time, f.arrival_time, f.duration, f.plane_id, f.capacity, p.num_of_fc_seats, p.num_of_eco_seats,
    f.first_class_price, f.eco_class_price, 
    f.departure_airport_id, a1.name as 'name_departure_airport',f.arrival_airport_id, a2.name as 'name_arrival_airport'
    FROM flights f 
    JOIN airports a1 ON f.departure_airport_id = a1.id
    JOIN airports a2 ON f.arrival_airport_id = a2.id
    JOIN planes p ON f.plane_id = p.id
    ORDER BY f.id;
    `;
    return db.load(sql);
  },


};
