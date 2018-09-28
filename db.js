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
  insert into products (name) values ('foo') returning id;
  insert into products (name) values ('bar') returning id;
  insert into products (name) values ('baz') returning id;
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
  console.log('Error: ' + err)
 })
}

const getProduct = (id, cb) => {
 client.query('select * from products where id = $1', [id], (err, result)=> {
  if(err){
   return cb(err)
  }
  if(result.rows.length === 0){
   return cb(new Error('No record for that id'))
  }
  cb(null, result.rows[0])
 })
}

const getProducts = (cb) => {
 client.query('select * from products;', (err, result) => {
  if(err){
   return cb(err)
  }
  cb(null, result.rows)
 })
}

module.exports = { connect, getProduct, getProducts }