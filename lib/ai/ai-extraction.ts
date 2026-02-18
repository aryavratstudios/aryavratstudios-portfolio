import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export interface ExtractedMetadata {
    screenshot_type: 'order_confirmation' | 'revision_request' | 'payment_proof' | 'deadline_discussion' | 'reference_sharing' | 'final_delivery' | 'other';
    client_name?: string;
    project_title?: string;
    amount?: number;
    currency?: string;
    deadline?: string;
    description?: string;
    events: {
        type: string;
        date: string;
        summary: string;
    }[];
    tasks: {
        title: string;
        description?: string;
        due_date?: string;
    }[];
    revisions?: {
        round: number;
        feedback: string;
        requested_at: string;
    };
}

export async function extractMetadataFromScreenshot(imageUrl: string): Promise<ExtractedMetadata> {
    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {
                role: "system",
                content: `You are an AI assistant specialized in analyzing screenshots for thumbnail designers and creative freelancers. 
                Extract structured metadata from the image provided. 
                Classify the screenshot into one of the following types: order_confirmation, revision_request, payment_proof, deadline_discussion, reference_sharing, final_delivery, other.
                Extract any names, amounts, currencies, dates, and specifically look for "revisions", "price", "deadline", and "payment".
                Generate a list of chronological events and tasks if applicable.
                Response must be in valid JSON format.`
            },
            {
                role: "user",
                content: [
                    { type: "text", text: "Analyze this screenshot and extract project-related metadata." },
                    {
                        type: "image_url",
                        image_url: {
                            url: imageUrl,
                        },
                    },
                ],
            },
        ],
        response_format: { type: "json_object" }
    });

    const content = response.choices[0].message.content;
    if (!content) throw new Error("No response from AI");

    return JSON.parse(content) as ExtractedMetadata;
}
