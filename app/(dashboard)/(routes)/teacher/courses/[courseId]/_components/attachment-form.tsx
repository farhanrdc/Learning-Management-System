"use client";

import * as z from "zod";
import axios from "axios";

import { File, ImageIcon, Loader, Pencil, PlusCircle, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Attachment, Course } from "@prisma/client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FileUpload } from "@/components/file-upload";

interface AttachmentFormProps {
  initialData: Course & { attachments: Attachment[] };
  courseId: string;
};

const formSchema = z.object({
  url: z.string().min(1),
});

export const AttachmentForm = ({
  initialData,
  courseId
}: AttachmentFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();


  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachment`, values);
      toast.success("Course updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  }

  const onDelete = async (id:string) => {
    try {
      setDeletingId(id)
      await axios.delete(`/api/courses/${courseId}/attachment/${id}`);
      toast.success("Attachment deleted");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
      finally{
      setDeletingId(null)
    }
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4 dark:bg-slate-800">
      <div className="font-medium flex items-center justify-between">
        Course image
        <Button onClick={toggleEdit} variant="outline">
          {isEditing && (
            <>Cancel</>
          )} 
          {!isEditing && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add File
            </>
          )} 
         
        </Button>
      </div>
            
        {!isEditing && (
          <>
            {initialData.attachments.length === 0 && (
              <p className="text-sm text-slate-500 italic">
                Belum ada attachment file
              </p>
              )}
            
            {initialData.attachments.length > 0 && (
              <div className="space-y-2">
                {initialData.attachments.map((attachmen) => (
                  <div
                    key={attachmen.id}
                    className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
                  >
                    <File className="w-5 h-5 mr-2 flex-shrink-0" />
                    <p className="text-xs line-clamp-1">
                      {attachmen.name}
                    </p>

                    {deletingId === attachmen.id && (
                      <div>
                        <Loader className="w-4 h-4 animate-spin"/>
                      </div>
                    )}

                    {deletingId !== attachmen.id && (
                      <button 
                      onClick={()=>onDelete(attachmen.id)}
                      className="ml-auto hover:opacity-75 transition">
                        <X className="w-4 h-4"/>
                      </button>
                    )}
                  </div>
                ))}
              </div>
              )}
          
          </>
        )
        }

        {isEditing && (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if(url){
                onSubmit({url:url})
              }
            }}
          />

          <div className="text-xs text-muted-foreground mt-4 ">
            Tambahkan lampiran file, untuk diselesaikan oleh murid kalian
          </div>
        </div>
       
      )}
    </div>
  )
}