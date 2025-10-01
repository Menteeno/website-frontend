"use client";

import { useLinkLoading } from "@/hooks/use-navigation-loading";
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
  const { handleLinkClick } = useLinkLoading();

  const handleClick = () => {
    handleLinkClick(href);
    onClick?.();
  };

  return (
    <Link href={href} className={className} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
