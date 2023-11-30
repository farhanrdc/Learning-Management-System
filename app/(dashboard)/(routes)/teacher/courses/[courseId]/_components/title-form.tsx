"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TitleFormProps {
    initialData: {
        title:string;
    },
    courseId:string;
}

const formSchema = z.object({
    title: z.string().min(1, {
      message: "Title is required",
    }),
  });

export const TitleForm = ({
    initialData,
    courseId
}: TitleFormProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter()

    const toogleEdit = ()  => setIsEditing((current) => !current)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData,
      });
    
      const { isSubmitting, isValid } = form.formState

      const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
          await axios.patch(`/api/courses/${courseId}`, values)
          toast.success("Course Updated")
          toogleEdit()
          router.refresh()
        } catch (error) {
            toast.error("Something went Wrong")
        }
      }
    return(
        <div className="mt-6 border bg-slate-100 rounded-md p-4 dark:bg-slate-800">
            <div className="flex justify-center items-center font-medium">
                Course Title
                <Button variant="ghost" onClick={toogleEdit} >
                  {isEditing ? (
                    <>Cancle</>
                  ) : (
                  !isEditing && 
                    <>
                      <Pencil className="h-4 w-4 mr-2"/>
                      Edit Title
                    </>
                  )}
                </Button>
            </div>

            {!isEditing && (
              <>
                {initialData.title}
              </>
            )}

            {isEditing && (
              <>
                <Form {...form}>
                  <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 mt-4"
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({field}) => (   
                                <FormItem>  
                                    <FormControl>
                                        <Input 
                                            disabled={isSubmitting} 
                                            placeholder="e.g. 'Advance Website Development'"
                                            {...field}
                                        />
                                    </FormControl>
                                    
                                    <FormMessage />
                                </FormItem>
                            )} 
                        />
                        
                        <div className="flex items-center gap-2">
                            <Button                             
                                type="submit"
                                disabled={!isValid || isSubmitting}
                            >
                                Save
                            </Button>
                        </div>
                  </form>
                </Form>
              </>
            )}
        </div>
    )
}