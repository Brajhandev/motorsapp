const { Router } = require('express')
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/users.controllers')

const usersRouter = Router()

usersRouter.get('/', getAllUsers)
usersRouter.get('/:id', getUserById)
usersRouter.post('/', createUser)
usersRouter.patch('/:id', updateUser)
usersRouter.delete('/:id', deleteUser)

module.exports = usersRouter