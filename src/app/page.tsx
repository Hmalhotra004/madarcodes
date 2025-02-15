"use client";
// import Answer from "@/components/chat/Answer";
import ChatInput from "@/components/chat/ChatInput";
// import LoadingText from "@/components/chat/LoadingText";
// import Question from "@/components/chat/Question";
// import Loading from "@/components/fallbacks/Loading";
// import ServerError from "@/components/fallbacks/ServerError";
import { cn } from "@/lib/utils";
// import useQuestionLoading from "@/store/useQuestionLoading";
// import { chat } from "@/types";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { useEffect, useRef } from "react";

const ChatPage = () => {
  // const { loading } = useQuestionLoading();
  // const bottomRef = useRef<HTMLDivElement>(null);

  // const {
  //   data: chats,
  //   isLoading,
  //   isError,
  // } = useQuery<chat[]>({
  //   queryKey: ["chatMessages"],
  //   queryFn: async () => {
  //     const response = await axios.get(`http://127.0.0.1:8000/api/chat/`);
  //     return response.data;
  //   },
  // });

  // useEffect(() => {
  //   if (bottomRef.current) {
  //     bottomRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, [chats]);

  // if (isLoading) return <Loading />;
  // if (isError) return <ServerError />;

  return (
    <section
      className={cn(
        "transition-all flex flex-col items-center justify-center h-full overflow-hidden"
      )}
    >
      <main className="h-full w-full overflow-auto flex">
        {/* {chats && chats.length > 0 ? (
          <div className="flex flex-col justify-start mt-6 mx-12 gap-y-3">
            {chats.map((chat) => (
              <div key={chat.chat}>
                {chat.by_user === "question" && (
                  <>
                    <Question question={chat.message} />
                    {loading[chat.chat] && <LoadingText />}
                  </>
                )}

                {chat.by_user === "answer" && (
                  <Answer
                    answer={chat.message}
                    id={chat.chat}
                  />
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
        ) : ( */}
        <div className="flex flex-grow flex-1 items-center justify-center">
          <h1 className="text-2xl font-semibold text-center">Hello there</h1>
        </div>
        {/* )} */}
      </main>

      <ChatInput />
    </section>
  );
};

export default ChatPage;
