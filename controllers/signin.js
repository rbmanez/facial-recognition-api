

const signin = (req, res, bcrypt, knex) => {
	const { email, password } = req.body;
	// validate no empty inputs
	if (!email || !password){
		return res.status(400).json('incorrect inputs');
	}
	// select * from 'login' where 'email' = req.body.email
	knex('login')
		.where({
			email: email
		})
		.then(loginUser=>{
			// if login password = hash (isValid) return:
			// select * from 'users' where 'email' = req.body.email
			const isValid = bcrypt.compareSync(password, loginUser[0].hash);
			if (isValid){
				return knex('users').where('email', email)
					.where('email', '=', email)
					.then(user=>{
						res.json(user[0])
					})
					.catch(err=>res.status(400).json('Unable to get user.'))
			} else {
				res.status(400).json('Error with credentials.')
			}
		})
		.catch(err=>{
			console.log(err)
			res.status(400).json('Error with credentials.')
		})
}

module.exports = signin;