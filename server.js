const pg = require('pg')

const client = new pg.Client(process.env.DATABASE_URL)

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