module.exports = function (req, res) {
	const { prompt } = req.query;
	if (!prompt) {
		return res.status(412).send({
			"error": "Missing prompt"
		});
	}
	res.json({
		prompt
	});
};