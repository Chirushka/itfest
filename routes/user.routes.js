const Router = require('express')
const router = new Router()
const userController = require('../controller/user.controller')

//Создание пользователя
router.post('/createUser', userController.createUser)

//Получение пользователя
router.post('/getUser', userController.getUser)

//Удаление пользователя
router.delete('/deleteUser', userController.deleteUser)

//Установка токена телефона к юзеру
router.put('/setUserToken', userController.setUserToken)


module.exports = router

