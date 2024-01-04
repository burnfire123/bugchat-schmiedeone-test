module.exports = function (req, res) {
	const { prompt } = req.query;
	res.json({
		prompt
	});
};