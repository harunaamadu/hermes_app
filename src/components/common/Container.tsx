import { cn } from "@/lib/utils";
import React from "react";

type ContainerElement = "div" | "section" | "article";

interface ContainerProps extends React.ComponentProps<"div"> {
  as?: ContainerElement;
}

const Container = ({
  as: Tag = "div",
  className,
  children,
  ...props
}: ContainerProps) => {
  return (
    <Tag
      className={cn("flex flex-col w-full h-full p-4 sm:px-6 lg:px-10 max-w-360 mx-auto", className)}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default Container;