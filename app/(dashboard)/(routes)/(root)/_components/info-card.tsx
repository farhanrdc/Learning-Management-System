import { LucideIcon } from "lucide-react";

import { IconBadge } from "@/components/icon-badge"

interface InfoCardProps {
    numberOfItems:number;
    icon: LucideIcon;
    label: string;
    variant: "default" |"success";
}

export const InfoCard = ({
    variant,
    icon: Icon,
    numberOfItems,
    label,
  }: InfoCardProps) => {
    return (
        <div className="border rounded-md flex items-center gap-x-2 p-3">
          <IconBadge
            variant={variant}
            icon={Icon}
          />
          <div>
            <p className="font-medium">
              {label}
            </p>
            <p className="text-gray-500 text-sm dark:text-gray-200">
              {numberOfItems} {numberOfItems === 1 ? "Course" : "Courses"}
            </p>
          </div>
        </div>
      )
  }