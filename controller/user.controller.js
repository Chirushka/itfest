const db = require('../config')


class UserController{

    //Создание пользователя
    async createUser(req, res) {
        const { login, pass } = req.body;
    
        // Сначала проверим, существует ли уже пользователь с таким логином
        const checkUserSql = "SELECT * FROM users WHERE login = ?";
        
        db.get(checkUserSql, [login], (err, row) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
    
            // Если пользователь с таким логином уже существует
            if (row) {
                return res.status(400).json({ error: 'User with this login already exists' });
            }
    
            // Если логин уникален, продолжаем с созданием пользователя
            const insertUserSql = "INSERT INTO users (login, pass, token) VALUES (?, ?, ?)";
            const token = ""; // Здесь вы можете сгенерировать токен, если необходимо
    
            db.run(insertUserSql, [login, pass, token], function(err) {
                if (err) {
                    return res.status(500).json({ error: 'Failed to create user' });
                } else {
                    return res.status(201).json({ id: this.lastID, login: login }); // Возвращаем ID нового пользователя
                }
            });
        });
    }
    

    //Получение пользователя
    async getUser(req,res){
        const { login, password} = req.body
        const sql = (
            `select * from users where (login=? AND pass=?);`
        )
        db.all(sql,[login, password], (err,rows) => {
            if (err) return res.json(err)
            if(rows.length === 0) return res.json('Данные не совпадают! Проверьте и повторите попытку')
            else res.json(rows)
    })
    }


    //Удаление пользователя
    async deleteUser(req, res) {
        const { id } = req.body;
    
        // Проверяем, указан ли id и является ли он числом
        if (!id || isNaN(id)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }
    
        // Проверяем, существует ли пользователь с данным ID
        const checkUserSql = 'SELECT * FROM users WHERE id = ?';
    
        db.get(checkUserSql, [id], (err, user) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
    
            // Если пользователь не существует, возвращаем ошибку
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            // Удаляем пользователя
            const deleteSql = 'DELETE FROM users WHERE id = ?';
    
            db.run(deleteSql, [id], function (err) {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
    
                // Проверяем, сколько записей было удалено
                if (this.changes === 0) {
                    return res.status(404).json({ message: 'User not found' });
                }
    
                return res.json({ message: 'User deleted successfully' });
            });
        });
    }
    
    
    
    //Установка токена телефона к юзеру
    async setUserToken(req,res){
        const {user, token} =req.body
        const sql = (
            ` update users set token=? where id=?;`
        )

        db.all(sql,[token, user], (err,rows) => {
            if (err) return res.json(err)
            else res.json(rows)
        })
    }

    
}



module.exports = new UserController()