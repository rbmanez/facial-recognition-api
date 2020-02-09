// clarifai api for face detection
const Clarifai = require('clarifai');
const app = new Clarifai.App({apiKey: 'f3ee26c8d73c4f86b167e572672c92f2'});

const apiCall = (req, res) => {
	app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {
		res.json(data);
	})
	.catch(err => res.status(400).json('API call error.'))
}

const image = (req, res, knex) => {
	const { id } = req.body;
	// update 'users' set 'entries' = entries++ where 'id' = req.body.id
	knex('users')
	  .where('id', '=', id)
	  .increment('entries', 1)
	  .returning('entries')
	  .then(entries=>{
	  	res.json(entries[0]);
	  })
	  .catch(err=>{
	  	res.status(400).json("Error getting entries.")
	  })
}

module.exports = {
	image,
	apiCall
}