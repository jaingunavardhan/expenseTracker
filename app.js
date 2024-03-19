const express = require('express');
const expenseRoutes = require('./routes/expenseRouter.js');
const sequelize = require('./util/database.js');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(expenseRoutes);

sequelize.sync()
    .then(()=>{
        app.listen(4000);
    })
    .catch(error=>console.log(error));

