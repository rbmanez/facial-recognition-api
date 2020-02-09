

const register = (req, res, bcrypt, knex) => {
	const { name, email, password } = req.body;
	// validate no empty inputs
	if (!name || !email || !password){
		return res.status(400).json('incorrect inputs');
	}
	// hash the password
	const hash = bcrypt.hashSync(password);
	// insert into 'login' ('email', 'hash') values (email, hash)
	knex.transaction(trx=>{
		trx('login')
			.insert({
				email: email,
				hash: hash
			})
			.returning('email')
			.then(registerEmail=>{
				// insert into 'users' ('name', 'email', 'joined')
				// values (name, registerEmail[0], new Date())
				return trx('users')
					.insert({
						name: name,
						email: registerEmail[0],
						joined: new Date()
					})
					.returning('*')
					.then(user=>{
						res.json(user[0])
					})
			})
			.then(trx.commit)
			.catch(trx.rollback)
	})
	.catch(err=>{
		res.status(400).json("error registering")
	})
}

module.exports = register;