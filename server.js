const pg = require('pg')
require('dotenv').config()

const client = new pg.Client(process.env.DB_URL)
const seed = () => {
 const qry = `
  DROP TABLE IF EXISTS products;
  CREATE TABLE products (
   id SERIAL primary key,
   name text
  );
  insert into products (name) values ('foo');
  insert into products (name) values ('bar');
  insert into products (name) values ('baz');
 `
 client.query(qry, (err, result) => {
  if(err){
   console.log(err)
  }
 })
}

const connect = () => {
 client.connect((err) => {
  if(!err){
   if(process.env.SEED){
    console.log('Seed DB')
     seed()
   }
  }
 })
}
connect()