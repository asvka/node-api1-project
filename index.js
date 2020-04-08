const express = require('express')
const db = require('./database')

const server = express()

server.use(express.json())

server.get('/', (req, res) => {
    res.json({ message: 'Testing 1, 2, 3...' })
})

server.get('/users', (req, res) => {
    const users = db.getUsers()
    res.json(users)
})

server.listen(777, () => {
    console.log("server started at port 777")
})