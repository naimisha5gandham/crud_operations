const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();
const pug = require('pug');
const home = require("./routes/home");


const port = process.env.PORT || 5000




app.set("views", "./views");
app.set("view engine", "pug");


app.use("/", home);

app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())

const pool = mysql.createPool({
    connectionLimit : 50,
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'nodejs_students'
})




app.get('/data', (req,res)=> {

pool.getConnection((err,connection)=> {
  if(err) throw err
  console.log(`connected as id ${connection.threadId}`)
  connection.query('SELECT * from students', (err,rows)=> {
      connection.release()
      if(!err){
        res.send(rows)  
      } else{
          console.log(err)
      }
  })

})


})

app.get('/:id', (req,res)=> {

    pool.getConnection((err,connection)=> {
      if(err) throw err
      console.log(`connected as id ${connection.threadId}`)
      connection.query('SELECT * from students WHERE id = ?', [req.params.id], (err,rows)=> {
          connection.release()
          if(!err){
            res.send(rows)  
          } else{
              console.log(err)
          }
      })
    
    })
    
    
    })

    app.delete('/:id', (req,res)=> {

        pool.getConnection((err,connection)=> {
          if(err) throw err
          console.log(`connected as id ${connection.threadId}`)
          connection.query('DELETE  from students WHERE id = ?', [req.params.id], (err,rows)=> {
              connection.release()
              if(!err){
                res.send(`Student with the Record ID : ${[req.params.id]} has been removed.`)  
              } else{
                  console.log(err)
              }
          })
        
        })
        
        
        })
     
        app.post('/register', (req,res)=> {

            pool.getConnection((err,connection)=> {
              if(err) throw err
              console.log(`connected as id ${connection.threadId}`)

              const params = req.body

              connection.query('INSERT  INTO students SET ?', params, (err,rows)=> {
                  connection.release()
                  if(!err){
                    res.send(`Student with the name : ${params.name} has been added.`)  
                  } else{
                      console.log(err)
                  }
              })

              console.log(req.body)
            
            })
            
            
            })
           

            app.put('/update', (req,res)=> {

                pool.getConnection((err,connection)=> {
                  if(err) throw err
                  console.log(`connected as id ${connection.threadId}`)
    
                  const params = req.body
                  const { id, name, section, subject} = req.body
    
                  connection.query('UPDATE students SET name = ? , section = ? , subject = ? WHERE id = ?',[ name, section, subject,id] , (err,rows)=> {
                      connection.release()
                      if(!err){
                        res.send(`Student with the name : ${name} has been updated.`)  
                      } else{
                          console.log(err)
                      }
                  })
    
                  console.log(req.body)
                
                })
                
                
                })

app.listen(port, ()=> console.log(`Listen on port ${port}`))

