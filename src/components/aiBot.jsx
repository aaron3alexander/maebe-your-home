import { useEffect, useState } from "react";
import OpenAI from "openai";


export default function Aibot() {

    const [generatedText, setGeneratedText] = useState("");
    const [userInput, setUserInput] = useState("");
    const [chatMessages, setChatMessages] = useState([]);
    const [generatedMsgs, setGeneratedMsgs] = useState([]);
    const [apiCallFlag, setApiCallFlag] = useState(false);
    const maxTokens = 100;

    const handleInputs = (event) => {
        setUserInput(event.target.value);
    }
    const handleUserMsg = () => {
        if (userInput) {
            setChatMessages([...chatMessages, { role: "user", content: userInput }]);
            setUserInput("");
        }
    }

    const main = async (chatMsg) => {
        setApiCallFlag(true);
        const openai = new OpenAI({ apiKey: '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', dangerouslyAllowBrowser: true });

        try {
            if (chatMsg.length !== 0) {
                let textPrompt = (chatMessages.slice(-1)).map(message => message.content) + " and limit it to 2 sentences";
                console.log(textPrompt);
                console.log(chatMsg);
                const completion = await openai.chat.completions.create({
                    messages: (chatMessages.slice(-1)).map((message) => ({ role: message.role, content: textPrompt})),
                    //messages: chatMsg,
                    model: 'gpt-3.5-turbo',
                    //max_tokens: maxTokens,
                });
                const response = completion.choices[0].message.content
                setGeneratedText(response);
                setGeneratedMsgs([...generatedMsgs, {role: "system", content: response}]);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setApiCallFlag(false);
        }
    }  

    useEffect(() => {
        if (!apiCallFlag) {
            main(chatMessages.slice(-1));
        }
    }, [chatMessages, apiCallFlag]);

    return (
        <div className="h-3/4 w-1/2 p-3 rounded-lg flex flex-col items-center border-2 border-teal-500">
            <div>
                {chatMessages.map((message, index) => (
                    <div key={index} className={message.role === "user" ? "text-right" : "text-left"}>
                        <p>User: {message.content}</p>
                    </div>
                ))}
                {generatedMsgs.map((message, index) => (
                    <div key={index} className={message.role === "system" ? "text-left" : "text-right"}>
                        <p>AI Bot: {message.content}</p>
                    </div>
                ))}
            </div>

            <div className="flex items-center" >
                <input
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-500"
                    type="string"
                    placeholder="Enter a Question"
                    value={userInput}
                    onChange={handleInputs}
                />
                <button onClick={handleUserMsg}>Send</button>
            </div>
        </div>
    );
}
