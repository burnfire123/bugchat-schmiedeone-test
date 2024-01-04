const linkWords = new Set([
	"how", "help", "and", "or", "can", "i", "you", "he", "she", "we", "they", "do",
	"this", "that"
]);

module.exports = function (req, res) {
	const { prompt } = req.query;
	if (!prompt) {
		return res.status(412).send({
			"error": "Missing prompt"
		});
	}
	const usefulPrompt = prompt.toLowerCase().split(/[ ,.!?]/).filter(word => !linkWords.has(word)).join(" ");
	return res.json({
		prompt: usefulPrompt
	});
};