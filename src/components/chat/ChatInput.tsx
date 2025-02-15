"use client";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import useQuestionLoading from "@/store/useQuestionLoading";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ArrowUp, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  question: z.string().min(1),
});

const ChatInput = () => {
  const [value, setValue] = useState("");
  const { changeLoading } = useQuestionLoading();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  async function saveAnswer(answer: string) {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/chat/save/",
        {
          type: "answer",
          message: answer,
        }
      );
      if (response.status === 200) {
        changeLoading(response.data.id, true);
        queryClient.invalidateQueries({
          queryKey: ["chatMessages"],
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      stop();
      const postResponse = await axios.post(
        "http://127.0.0.1:8000/api/chat/save/",
        {
          type: "question",
          message: values.question,
        }
      );
      if (postResponse.status === 200) {
        queryClient.invalidateQueries({
          queryKey: ["chatMessages"],
        });
      }
      changeLoading(postResponse.data.id, true);
      form.resetField("question");
      const getResponse = await axios.get(
        `http://127.0.0.1:8000/api/query/?query=${values.question}`
      );
      if (getResponse.status === 200) {
        await saveAnswer(getResponse.data.answer);
        changeLoading(postResponse.data.id, false);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    form.setValue("question", value);
  }, [value, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full"
      >
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center justify-center flex-col mb-4">
                  <div className="flex border-2 border-white rounded-full px-4 py-2 w-11/12 items-center mb-2">
                    <Search size={30} />
                    <Input
                      className={cn(
                        `w-full border-none border-0 focus-visible:ring-offset-0 focus-visible:ring-0 mx-1
                           placeholder:text-cold-dark placeholder:text-lg text-md dark:bg-transparent`
                      )}
                      placeholder="Ask HOMI"
                      {...field}
                      disabled={isLoading}
                      autoComplete="off"
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                        setValue(e.target.value);
                      }}
                    />
                    <button
                      type="submit"
                      className="bg-ceremonial-purple p-1 rounded-full ml-2"
                      disabled={isLoading}
                    >
                      <ArrowUp
                        size={25}
                        className="text-liberty-blue"
                      />
                    </button>
                  </div>
                  <p className="text-xs">
                    HOMI can make mistakes. Check important info.
                  </p>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default ChatInput;
