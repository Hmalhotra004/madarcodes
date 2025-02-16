"use client";
import ActionTooltip from "@/components/ActionTooltip";
import useQuestionLoading from "@/store/useQuestionLoading";
import { useEffect, useRef, useState } from "react";

import { CheckIcon, CopyIcon } from "lucide-react";

interface AnswerProps {
  answer: string;
  id: string;
}

const Answer = ({ answer, id }: AnswerProps) => {
  const [copied, setCopied] = useState(false);
  const { loading } = useQuestionLoading();

  function onCopy() {
    navigator.clipboard.writeText(answer);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  }

  return (
    <section className="flex flex-col ml-10">
      <div className="mb-2 text-slate-200 font-medium text-xl flex gap-x-2 items-start group">
        {loading[id] ? (
          <TypingEffect
            answer={answer}
            id={id}
          />
        ) : (
          <h1 className="text-left text-xl font-medium text-slate-200">
            {answer}
          </h1>
        )}
      </div>
      {!loading[id] && (
        <div className="flex gap-x-4 mb-4 items-center justify-start">
          {!copied ? (
            <ActionTooltip label="Copy to Clipboard">
              <CopyIcon
                size={20}
                className="cursor-pointer transition"
                onClick={onCopy}
              />
            </ActionTooltip>
          ) : (
            <CheckIcon
              size={20}
              className="cursor-pointer transition"
            />
          )}
        </div>
      )}
    </section>
  );
};

export default Answer;

export function TypingEffect({ answer, id }: AnswerProps) {
  const { changeLoading } = useQuestionLoading();
  const [displayedText, setDisplayedText] = useState("");
  const [i, setI] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (i >= answer.length) return;

    const typingEffect = setInterval(() => {
      setDisplayedText((prev) => prev + answer.charAt(i));
      setI((prev) => prev + 1);

      bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
    }, 10);

    return () => clearInterval(typingEffect);
  }, [i, answer]);

  useEffect(() => {
    if (i === answer.length) {
      changeLoading(id, false);
    }
  }, [i, answer.length, id, changeLoading]);

  return (
    <>
      <h1 className="text-left text-xl font-medium text-slate-200">
        {displayedText}
      </h1>
      <div ref={bottomRef} />
    </>
  );
}
