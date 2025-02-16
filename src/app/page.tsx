"use client";
import Answer from "@/components/chat/Answer";
import ChatInput from "@/components/chat/ChatInput";
import LoadingText from "@/components/chat/LoadingText";
import Question from "@/components/chat/Question";
import { cn } from "@/lib/utils";
import useChatStore from "@/store/useChatStore";
import useQuestionLoading from "@/store/useQuestionLoading";
import { useEffect, useRef } from "react";

const ChatPage = () => {
  const { loading } = useQuestionLoading();
  const bottomRef = useRef<HTMLDivElement>(null);
  const { chats } = useChatStore();

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chats]);

  return (
    <section
      className={cn(
        "transition-all flex flex-col items-center justify-center h-screen overflow-hidden"
      )}
    >
      <main className="h-full w-full overflow-auto flex">
        {chats && chats.length > 0 ? (
          <div className="flex flex-col justify-start mt-6 mx-12 gap-y-3">
            {chats.map((chat) => (
              <div key={chat.id}>
                {chat.byUser === "question" && (
                  <>
                    <Question question={chat.message} />
                    {loading[chat.id] && <LoadingText />}
                  </>
                )}

                {chat.byUser === "answer" && (
                  <Answer
                    answer={chat.message}
                    id={chat.id}
                  />
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
        ) : (
          <div className="flex flex-grow flex-1 items-center justify-center">
            <h1 className="text-2xl font-semibold text-center">Hello there</h1>
          </div>
        )}
      </main>

      <ChatInput />
    </section>
  );
};

export default ChatPage;
