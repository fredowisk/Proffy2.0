import knex from 'knex';
import path from 'path';

const database = knex({
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'database.sqlite'),
  },
  //coloque null nos campos que não forem preenchidos do banco de dados
  useNullAsDefault: true,
});

export default database;