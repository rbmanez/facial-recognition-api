const express = require('express');
const app = express();
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

// controllers for routes:
const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'password',
    database : 'face_recognition'
  }
});

app.use(express.json());
app.use(cors());

app.get('/', (req,res) => {
	// knex.select('name').from('users')
	// 	.then(name=>res.json(name))
  res.json("success");
});
app.post('/signin', (req, res) => signin(req, res, bcrypt, knex));
app.post('/register', (req, res) => register(req, res, bcrypt, knex));
app.get('/profile/:id', (req, res) => profile(req, res, knex));
app.put('/image', (req, res) => image.image(req, res, knex));
app.post('/imageurl', (req, res) => image.apiCall(req, res));

app.listen(process.env.PORT || 3000, () => {
	console.log(`app is running on port ${process.env.PORT}`);
});
