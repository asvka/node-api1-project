let users = [
    { id: "1", name: "Anthony Hernandez", bio: "Professional garlic bread enthusiast" },
    { id: "2", name: "Desmond Ellington", bio: "Professional thrower of shade, noted Scorpio" },
    { id: "3", name: "Katie McCaffery", bio: "Purveyor of the finest Mexican food and celebrity fartist" }
]

function getUsers() {
    return users
}

function createUser(data) {
    const payload = {
        id: String(users.length + 1),
        ...data
    }
    users.push(payload)
    return payload
}

function getUserById(id) {
    return users.find(u => u.id === id)
}

function updateUser(id, data) {
    const index = users.findIndex(u => u.id === id)
    users[index] = {
        ...users[index],
        ...data
    }
    return users[index]
}

function deleteUser(id) {
    users = users.filter(u => u.id != id)
}

module.exports = {
    getUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser
}