import { cn } from "../lib/utils";

export default function MaxWidthWrapper({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1920px]    px-4 md:px-10",
        className
      )}
    >
      {children}
    </div>
  );
}
