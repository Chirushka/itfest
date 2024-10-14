const express = require('express')
const userRouter = require('./routes/user.routes')
const categoryRouter = require('./routes/category.routes')
const tasksRouter = require('./routes/tasks.routes')

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8080

const app = express()

app.use(bodyParser.json({limit: '500mb'}))
app.use('/api',userRouter)
app.use('/api',categoryRouter)
app.use('/api',tasksRouter)


var admin = require("firebase-admin");

var serviceAccount = require("./vuzappcursovaya-firebase-adminsdk-e8ymi-717a6727ea.json");

admin.initializeApp({credential: admin.credential.cert(serviceAccount)});



app.listen(PORT, () => console.log(`Сервер запущен с портом: ${PORT}`))


