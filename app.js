const express = require('express');
const database = require('./src/config/mongoDB');
const bodyParser = require('body-parser');

const app = express();
port = 3000;

// ----- Middleware ----- //
app.use(bodyParser.json());


// ----- routes ----- //

const authRoutes = require('./src/routes/auth.routes');
app.use('/auth', authRoutes);


const taskRoutes = require('./src/routes/task.routes');
app.use('/task', taskRoutes);


const categoryRoutes = require('./src/routes/category.routes');
app.use('/category', categoryRoutes);


// ----- Server Start ----- //
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});