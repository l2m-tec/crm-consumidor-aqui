import Image from "next/image";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  variant?: "full" | "mark";
  className?: string;
};

export function BrandLogo({ variant = "mark", className }: BrandLogoProps) {
  if (variant === "full") {
    return (
      <div className={cn("flex items-center justify-center rounded-xl bg-black px-4 py-2", className)}>
        <Image
          src="/consumidor-aqui-logo.png"
          alt="Consumidor Aqui"
          width={851}
          height={591}
          priority
          className="h-auto w-36"
        />
      </div>
    );
  }

  return (
    <span
      role="img"
      aria-label="Consumidor Aqui"
      className={cn("relative block h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-black", className)}
    >
      <Image
        src="/consumidor-aqui-logo.png"
        alt=""
        width={851}
        height={591}
        className="absolute -left-[18px] -top-[2px] h-auto w-[76px] max-w-none"
      />
    </span>
  );
}
