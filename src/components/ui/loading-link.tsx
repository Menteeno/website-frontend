"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface LoadingLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  [key: string]: any;
}

export function LoadingLink({
  href,
  children,
  className = "",
  onClick,
  ...props
}: LoadingLinkProps) {
  return (
    <Link href={href} className={className} {...(onClick && { onClick })} {...props}>
      {children}
    </Link>
  );
}
