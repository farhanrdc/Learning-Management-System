import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";

import { IconBadge } from "@/components/icon-badge";
import { FormatPrice } from "@/lib/format";
import { Description } from "@radix-ui/react-dialog";
import { CourseProgress } from "./course-progress";
// import { CourseProgress } from "@/components/course-progress";

interface CourseCardProps {
    id: string;
    title: string;
    imageUrl: string;
    chaptersLength: number;
    price: number;
    progress: number | null;
    category: string;
  };
  
  export const CourseCard = ({
    id,
    title,
    imageUrl,
    chaptersLength,
    price,
    progress,
    category
  }: CourseCardProps)  => {
  return (
    <Link href={`/courses/${id}`}>
        <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
            <div className="relative w-full aspect-video rounded-md overflow-hidden">
                <Image
                    fill
                    className="object-cover"
                    alt={title}
                    src={imageUrl}
                />
            </div>

            <div className="flex flex-col pt-2 dark:group-hover:bg-slate-900">
                <div className="text-lg md:text-basefont-medium group-hover:text-sky-700 transition line-clamp-2">
                    {title}
                </div>

                <p className="text-xs text-muted-foreground">
                    {category}
                </p>

                <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
                    <div className="flex items-center gap-x-1 text-slate-500 dark:text-slate-300">
                        <IconBadge size="sm" icon={BookOpen} />
                        <span>
                            {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
                        </span>
                    </div>
                </div>

                {progress !== null ? (
                   
                    <CourseProgress
                        variant={progress === 100 ? "success" : "default"}
                        size="sm"
                        value={progress}
                    />
                ) : (
                    <p className="text-md md:text-sm font-medium text-slate-700 dark:text-slate-200">
                    {FormatPrice(price)}
                    </p>
                )}
            </div>
        </div>
    </Link>
  )
}

