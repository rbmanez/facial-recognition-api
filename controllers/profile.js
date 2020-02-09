

const profile = (req, res, knex) => {
	const { id } = req.params;
	// select * from 'users' where 'id' = req.params.id
	knex('users').where('id', id)
		.then(user=>{
			if (user.length){
				console.log(user[0])
				res.json(user[0])
			} else {
				res.status(400).json("Can't find user.")
			}
		})
		.catch(err=>{
			res.status(400).json("Error finding user.")
		})
}

module.exports = profile;