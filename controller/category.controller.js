const db = require('../config')


class CategoryController {

    // создание своей категории
    async createCategory(req, res) {
        const { name } = req.body
        const sql = (
            `insert into category ( name ) values (?);`
        )
        db.all(sql,[  name ], (err,rows) => {
            if (err) return res.json(err)
            else return res.json(rows)     
        })

    }

    // изменение своей задания
    async updateCategory(req, res) {
        
        const { id, name } = req.body
        const sql = (
            `update category set name=? where id=?;`
        )
        db.all(sql,[  name, id ], (err,rows) => {
            if (err) return res.json(err)
            else return res.json(rows)     
        })

    }

    // удаление своей категории
    async deleteCategory(req, res) {
        
        const { id } = req.body
        const sql = (
            `delete from category where id=?;`
        )
        db.all(sql,[  id ], (err,rows) => {
            if (err) return res.json(err)
            else return res.json(rows)     
        })

    }
    
}



module.exports = new CategoryController()