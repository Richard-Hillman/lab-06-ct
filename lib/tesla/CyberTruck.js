const pool = require('../utils/pool');

module.exports = class CyberTruck{
    id;
    color;
    type;

    constructor(row) {
      this.id = row.id;
      this.color = row.color;
      this.type = row.type;
    }

    static async insert({ color, type }) {
      const { rows } = await pool.query(
        'INSERT INTO cybertrucks (color, type) VALUES($1, $2) RETURNING *', [color, type]
      );

      return new CyberTruck(rows[0]);
    }
};
