const pg = require('pg')
require('dotenv').config()

const client = new pg.Client(process.env.DB_URL)

client.connect((err) => {
 if(!err){
  client.query('select * from foos', (err, result) => {
   if(err){
    console.log(err)
   }
   else{
    console.log(result.rows)
   }
  })
 }
})