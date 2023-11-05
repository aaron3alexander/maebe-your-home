import { useEffect, useState } from "react";
import OpenAI from "openai";
import axios from "axios";
import { useSelect } from "@mui/base";

const apiKey = "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";
const apiURL = "https://api.openai.com/v1/engines/davinci/completions";

export default function Aibot() {

    const [generatedText, setGeneratedText] = useState("");
    const [userInput, setUserInput] = useState("");
    const maxTokens = 100;

    useEffect(() => {
        async function main() {
            const openai = new OpenAI({ apiKey: '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', dangerouslyAllowBrowser: true });

            try {
                const completion = await openai.chat.completions.create({
                    messages: [{ role: 'system', content: 'Tell me about mortgage in the United States and limit it to 2 sentences' }],
                    model: 'gpt-3.5-turbo',
                    //max_tokens: maxTokens,
                });

                const response = completion.choices[0].message.content
                setGeneratedText(response);

            } catch (error) {
                console.error(error);
            }
        }

        main();

    }, []);

    return (
        <div className="h-3/4 w-1/2 p-3 rounded-lg flex flex-col items-center border-2 border-teal-500">
            <h1>AI Bot: {generatedText}</h1>
            <p>User: {userInput}</p>
            <input
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-500"
              type="string"
              value={userInput}
              onChange={(e) => {
                setUserInput(e.target.value);
              }}
            />
            
        </div>
    );
}
