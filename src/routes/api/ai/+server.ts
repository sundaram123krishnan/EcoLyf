export const POST = async ({ request }) => {
	const text = await request.json();

	async function query(data: { inputs: any }) {
		const response = await fetch(
			'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3',
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${process.env.AI_KEY}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			}
		);
		const result = await response.text();
		return result;
	}
	const result = JSON.parse(await query({ inputs: text }))[0].generated_text;
	const filteredResult = result.replace(text, '').trim();

	return new Response(filteredResult, { status: 200 });
};
