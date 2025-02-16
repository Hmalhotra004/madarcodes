"use client";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import useChatStore from "@/store/useChatStore";
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
  const { addMessage, getMessageId } = useChatStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios.get("https://homi23-taqneeq2.hf.space/test");
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
    addMessage(values.question, "question");
    const id = getMessageId(values.question);
    changeLoading(id, true);
    form.setValue("question", "");
    setTimeout(() => {
      changeLoading(id, false);
      addMessage("hello bhai kaise ho", "answer");
      const aId = getMessageId("hello bhai kaise ho");
      changeLoading(aId, true);
    }, 1000);
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
                      placeholder="Ask and u shall receive"
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
                      className="bg-sex-100 p-1 rounded-full ml-2"
                      disabled={isLoading}
                    >
                      <ArrowUp
                        size={25}
                        className="text-liberty-blue"
                      />
                    </button>
                  </div>
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
