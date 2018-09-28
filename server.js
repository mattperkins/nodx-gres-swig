const express = require('express')

const db = require('./db')
db.connect()

const app = express()

app.get('/', (req,res,next) =>{
 db.getProducts((err, products)=>{
  if(err){
   return next(err)
  }
  res.send(products)
 })
})

app.use((err, req, res, next)=> {
 res.send(err.message)
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log( `Listening on port: ${port}`) )