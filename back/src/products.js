const routes = require('express').Router();

routes.get('/get', (req, res) => {
	res.status(200).json({ message: 'Connected!' });

});

routes.post('/calculate', (req, res) => {
	console.log(req.body)
});

module.exports = routes;