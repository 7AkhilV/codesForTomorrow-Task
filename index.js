require('dotenv').config()
const express = require('express');
const sequelize = require('./config/db');
const loginRoutes = require('./routes/login.routes')
const categoryRoutes = require('./routes/categories.routes')
const serviceRoutes = require('./routes/service.routes')

const app = express();

const PORT = 5000

app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.use(express.json());

app.use(loginRoutes)
app.use(categoryRoutes)
app.use(serviceRoutes)


sequelize.sync().then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
});