const express = require('express')
const db = require('./database')

const server = express()

server.use(express.json())

//GET
server.get('/', (req, res) => {
    res.json({ message: 'Testing... 1, 2, 3...' })
})

server.get('/users', (req, res) => {
    const users = db.getUsers()
    if (users) {
        res.json(users)
    } else {
        console.error('The users information could not be retrieved.')
        res.status(500).json({
            errorMessage: 'The users information could not be retrieved.'
        })
    }
})
server.get('/users/:id', (req, res) => {
    const userId = req.params.id
    const user = db.getUserById(userId)
    const users = db.getUsers()

    if (user) {
        res.json(user)
    } else {
        res.status(404).json({
            message: 'The user with the specified ID does not exist.'
        })
    }
    if (!users) {
        console.error('The user information could not be retrieved.')
        res.status(500).json({
            errorMessage: 'The user information could not be retrieved.'
        })
    }
})

//POST
server.post('/users', (req, res) => {
    const users = db.getUsers()
    if (!req.body.name || !req.body.bio) {
        return res.status(400).json({
            errorMessage: 'Please provide name and bio for the user.'
        })
    }
    if (!users){
        res.status(500).json({
            errorMessage: 'There was an error while saving the user to the database.'
        })
    }
    const newUser = db.createUser({
        name: req.body.name,
        bio: req.body.bio
    })
    res.status(201).json(newUser)
})

//DELETE
server.delete('/users/:id', (req, res) => {
    const user = db.getUserById(req.params.id)
    if (user) {
    //     db.deleteUser(user.id)
    //     res.status(204).end
    // } else if (!user) {
    //     res.status(404).json({
    //         message: 'The user with the specified ID does not exist.'
    //     })
    // } else {
    //     res.status(500).json({
    //         errorMessage: 'The user could not be removed'
    //     })
    try {
        db.deleteUser(user.id)
        res.status(204).end
    } catch (err){
        res.status(404).json({
            message: 'The user with the specified ID does not exist.'
        });
    }} else {
        res.status(500).json({
            errorMessage: 'The user could not be removed.'
        })
    }
});

//PATCH
server.patch('/users/:id', (req, res) => {
    const user = db.getUserById(req.params.id)

    if (!req.body.name || !req.body.bio) {
        res.status(400).json({
            errorMessage: 'Please provide name and bio for the user.'
        })
    }

    if (user) {
        try {
            const updatedUser = db.updateUser(user.id, {
                name: req.body.name || user.name,
                bio: req.body.bio || user.bio,
            })
            res.status(200).json(updatedUser)
        } catch (err) {
            res.status(500).json({
                errorMessage: 'The user information could not be modified.'
            });
        }
    } else {
            res.status(404).json({
                errorMessage: 'The user with the specified ID does not exist.'
            })
            }
        }
)


server.listen(777, () => {
    console.log("server started at port 777")
})