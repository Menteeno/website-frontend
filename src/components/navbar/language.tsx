"use client";

import { Check } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTranslation } from "@/hooks/use-translation";
import { cn } from "@/lib/utils";

const languages = [
  {
    value: "en",
    dir: "ltr",
    label: "English",
    shortLabel: "En",
  },
  {
    value: "fa",
    dir: "rtl",
    label: "فارسی",
    shortLabel: "فا",
  },
];

export function Language() {
  const [open, setOpen] = React.useState(false);
  const { locale, changeLanguage } = useTranslation();

  const handleLanguageChange = (newLocale: string) => {
    changeLanguage(newLocale);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          role="combobox"
          aria-expanded={open}
          aria-label="Select language"
        >
          {locale
            ? languages.find((language) => language.value === locale)
                ?.shortLabel
            : "??"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[100px] p-0">
        <Command>
          <CommandList>
            <CommandEmpty>No language found.</CommandEmpty>
            <CommandGroup>
              {languages.map((language) => (
                <CommandItem
                  key={language.value}
                  value={language.value}
                  onSelect={handleLanguageChange}
                >
                  {language.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      locale === language.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
