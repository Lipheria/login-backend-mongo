//Dependencies
const express = require('express')
const app = express()
const mysql = require('mysql')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')

app.use(express.json())
app.use(cors())

app.get("/", (req, res) =>{
    res.send("Hello Cheese")
})

//Run the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log('Server is running on port 3002')
})


//Database(MySQL)
const db = mysql.createConnection({
    user: 'sql8646480',
    host: 'http://sql8.freesqldatabase.com',
    password: 'maCS5nyxj6',
    database: 'sql8646480'
})


//Route to the server that will register user

app.post('/register', (req,res)=>{
    //Get variables sent from the form
    const sentEmail = req.body.Email
    const sentUsername = req.body.UserName
    const sentPassword = req.body.Password

    //Create SQL statement to insert the Database table
    const SQL = 'INSERT INTO users (email, username, password) VALUES (?,?,?)'
    //We are going to enter these values through a variable
    const Values = [sentEmail, sentUsername, sentPassword]


    //Query to execute the sql statement above
    db.query(SQL, Values, (err, results)=>{
        if(err){
            res.send(err)
            console.log(err)
            console.error('Error inserting user:', err);
        }
        else{
            console.log('User inserted successfully!')
            res.send({message: 'User added!'})
            //Use Express and Cors
        }
    }) 
})


//Route to log in
app.post('/login', (req, res) => {
     //Get variables sent from the form
     const sentloginUserName = req.body.loginUserName
     const sentloginPassword = req.body.loginPassword
 
     //Create SQL statement to insert the Database table
     const SQL = 'SELECT * from users WHERE username = ? && password = ?'
     //We are going to enter these values through a variable
     const Values = [sentloginUserName, sentloginPassword]
 
 
     //Query to execute the sql statement above
     db.query(SQL, Values, (err, results)=>{
         if(err){
            res.send({error:err})
         }
         if(results.length > 0){
            res.send(results)
         }
         else(
            res.send({message: `Credentials Don't match`})
         )
     }) 
})