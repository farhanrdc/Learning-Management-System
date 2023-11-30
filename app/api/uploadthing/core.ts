import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs";
import { error } from "console";
import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();
 
const handleAuth = () => {
    const {userId} = auth()
    const isAuthorized = isTeacher(userId)

    if(!userId || !isAuthorized) throw new Error("Unauthorized")
    
    return(userId)
    
}
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
    courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        // Set permissions and file types for this FileRoute
        .middleware(() => auth())
        .onUploadComplete(() => {}),
    courseAttachment: f(["text", "image", "audio", "pdf", "video"])
        // Set permissions and file types for this FileRoute
        .middleware(() => auth())
        .onUploadComplete(() => {}),  
    chapterVideo: f({ video: { maxFileSize: "512GB", maxFileCount: 1 } })
        // Set permissions and file types for this FileRoute
        .middleware(() => auth())
        .onUploadComplete(() => {}),  
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;