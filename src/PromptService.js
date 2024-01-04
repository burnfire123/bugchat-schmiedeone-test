import axios from "axios";

export const promptService = {
	async getAnswer(prompt) {
		const { data: { error, response } } = await axios.get("http://localhost:8000/ask", {
			params: {
				prompt,
			}
		});
		if (error) {
			throw new Error(error);
		}
		return response;
	}
};