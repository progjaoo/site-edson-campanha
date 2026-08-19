"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";
import { Skeleton } from "./Skeleton";

interface LazyImageProps extends Omit<ImageProps, "onLoad"> {
  skeletonVariant?: "light" | "dark";
  containerClassName?: string;
}

export function LazyImage({
  src,
  alt,
  className,
  containerClassName,
  skeletonVariant = "light",
  ...props
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      {!loaded && !error && (
        <Skeleton
          variant={skeletonVariant}
          className="absolute inset-0 z-10 h-full w-full"
        />
      )}
      <Image
        src={src}
        alt={alt}
        className={cn(
          "transition-opacity duration-500",
          loaded ? "opacity-100" : "opacity-0",
          className
        )}
        onLoad={() => setLoaded(true)}
        onError={() => {
          setError(true);
          setLoaded(true);
        }}
        {...props}
      />
    </div>
  );
}
