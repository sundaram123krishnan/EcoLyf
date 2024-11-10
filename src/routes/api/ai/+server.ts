

export const POST = async ({ request }) => {

    const text = await request.json();
    async function query(data) {
		const response = await fetch(
			'https://api-inference.huggingface.co/models/HuggingFaceTB/SmolLM2-1.7B-Instruct',
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${process.env.AI_KEY}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			}
		);
		const result = await response.json();
		return result;
	}
	const result = await query({ inputs: text});
    
	return new Response(JSON.stringify(result), { status: 200 });
};