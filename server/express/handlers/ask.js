const { default: axios } = require("axios");

const linkWords = new Set([
	"how", "help", "and", "or", "can", "i", "you", "he", "she", "we", "they", "do",
	"this", "that", "about"
]);

module.exports = async function (req, res) {
	const { prompt } = req.query;
	if (!prompt) {
		return res.status(412).send({
			"error": "Missing prompt"
		});
	}
	const usefulPrompt = prompt
		.toLowerCase()
		.split(/[ ,.!?]/)
		.filter(word => !linkWords.has(word))
		.join(" ");
	// We will use Wikipedia's API to find a page
	const { data: { query: { pages }} } = await axios.get("https://en.wikipedia.org/w/api.php", {
		params: {
			action: "query",
			titles: usefulPrompt,
			prop: "extracts",
			format: "json",
			exintro: true,
			explaintext: true,
		}
	});
	if (pages[-1]) {
		return res.status(404).send({
			"error": "No page found"
		});
	}
	return res.json({
		prompt: usefulPrompt
	});
};