const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv');
const helmet = require('helmet');
const PORT = 8800;

const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postsRoute = require('./routes/posts');


dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  }, () => {
  console.log('Conected to MongoDb')
});

app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

app.use('/users', usersRoute);
app.use('/api', authRoute);
app.use('/posts', postsRoute);



app.listen(PORT, () => {
  console.log(`application is running on port ${PORT}`)
})