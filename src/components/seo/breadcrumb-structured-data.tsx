"use client";

import { usePathname } from "next/navigation";
import { StructuredData } from "./structured-data";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbStructuredDataProps {
  items?: BreadcrumbItem[] | undefined;
  customItems?: BreadcrumbItem[] | undefined;
}

export function BreadcrumbStructuredData({
  items,
  customItems,
}: BreadcrumbStructuredDataProps) {
  const pathname = usePathname();

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (customItems) return customItems;

    if (items) return items;

    // Auto-generate breadcrumbs from pathname
    const segments = pathname.split("/").filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { name: "Home", url: "https://menteeno.app" },
    ];

    let currentPath = "";
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const name =
        segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
      breadcrumbs.push({
        name: name,
        url: `https://menteeno.app${currentPath}`,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbData = {
    items: generateBreadcrumbs(),
  };

  return <StructuredData type="breadcrumb" data={breadcrumbData} />;
}
