import {
  createPropositionMessage,
  getPropositionMessages,
} from "@services/APIcall";
import { useEffect, useState } from "react";

export default function MessageThread({ propositionId, isBackend = false }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    getPropositionMessages(propositionId).then((res) => {
      setMessages(res);
    });
  }, []);

  const handleReply = async () => {
    const payload = {
      message_thread_id: messages[0].message_thread_id,
      content: newMessage,
      origin: isBackend ? "entreprise" : "user",
    };
    const [response] = await createPropositionMessage(payload, propositionId);
    const date = new Date(Date.now());
    setMessages([
      ...messages,
      { ...payload, id: response.insertId, time: date },
    ]);
    setNewMessage("");
  };

  return (
    <>
      <div className="w-full space-y-3 p-4 max-h-[300px] overflow-y-scroll">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`rounded-2xl p-4 w-3/4 min-w-[400px] ${
              (message.origin === "user" && !isBackend) ||
              (message.origin === "entreprise" && isBackend)
                ? "mr-0 m-auto bg-slate-300"
                : "ml-0 m-auto bg-slate-200"
            } `}
          >
            <p>{message.content}</p>
          </div>
        ))}
      </div>
      <div className="flex">
        <textarea
          className="w-full h-[100px]"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          type="button"
          onClick={handleReply}
          className="h-[100px] min-w-[100px]"
        >
          Envoyer
        </button>
      </div>
    </>
  );
}
