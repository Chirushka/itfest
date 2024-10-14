const Router = require('express')
const router = new Router()
const categoryController = require('../controller/category.controller')

// создание своей категории
router.post('/createCategory', categoryController.createCategory)

// изменение своей задания
router.put('/updateCategory', categoryController.updateCategory)

// удаление своей категории
router.post('/deleteCategory',categoryController.deleteCategory)



module.exports = router