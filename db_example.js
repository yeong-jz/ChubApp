// Create a sqlite3 database from the following template by executing the following command
//
//   node db_example.js
//

const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./db/airlineapp.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the airline database.');
});

db.serialize(() => {
  db.run("DROP TABLE IF EXISTS airline_users")
    .run("CREATE TABLE IF NOT EXISTS airline_users (first_name text,    \
                                            last_name text,             \
                                            address text                \
                                            )")
    .run("INSERT INTO airline_users(first_name, last_name, address)     \
          VALUES('sims', 'son', 'ntu street'),                          \
          ('goo', 'eeee', 'kevin street'),                              \
          ('ducks', 'co', 'pencart tota')")
    .each(`SELECT DISTINCT first_name, last_name, address FROM airline_users`, (err, row) => {
      if (err){
        throw err;
      }
      console.log(row.first_name, row.last_name, row.address);
    });
});

db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});
