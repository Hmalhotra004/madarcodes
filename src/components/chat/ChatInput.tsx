"use client";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import useChatStore from "@/store/useChatStore";
import useQuestionLoading from "@/store/useQuestionLoading";
import { zodResolver } from "@hookform/resolvers/zod";
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
  // const queryClient = useQueryClient();
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
      const response = await axios.get(
        `https://homi23-taqneeq2.hf.space/test?pussy=${values.question}`
      );
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }

    // Add user message with `loading: false`
    addMessage(values.question, "question");

    // Get the message ID
    const id = getMessageId(values.question);
    if (id) {
      changeLoading(id, true); // Update loading state only if id exists
    }

    form.setValue("question", "");

    setTimeout(() => {
      if (id) changeLoading(id, false); // Ensure valid id before using it

      // Add bot response with `loading: true`
      addMessage("hello bhai kaise ho", "answer");
      const aId = getMessageId("hello bhai kaise ho");

      if (aId) changeLoading(aId, false);
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
                      placeholder="Tell me about your business"
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
