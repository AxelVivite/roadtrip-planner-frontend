import { cn } from "@utils/cn";

interface Properties {
  children: React.ReactNode;
  className: string;
}

export default function TypographyH1({ children, className }: Properties) {
  return (
    <h1
      className={cn(
        className,
        "scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance"
      )}
    >
      {children}
    </h1>
  );
}
