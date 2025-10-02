"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import type { BlogAuthor } from "@/types/blog";
import { memo } from "react";

interface BlogAuthorCardProps {
  author: BlogAuthor;
}

export const BlogAuthorCard = memo<BlogAuthorCardProps>(({ author }) => {
  const { t, locale } = useTranslation();
  const isRTL = locale === "fa";

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          {author.avatar && (
            <img
              src={author.avatar}
              alt={author.name}
              className="w-12 h-12 rounded-full object-cover"
            />
          )}
          <div>
            <div className="text-lg" dir={isRTL ? "rtl" : "ltr"}>
              {author.name}
            </div>
            {author.bio && (
              <CardDescription className="mt-1" dir={isRTL ? "rtl" : "ltr"}>
                {author.bio}
              </CardDescription>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      {author.social && (
        <CardContent>
          <div className="flex gap-4">
            {author.social.twitter && (
              <a
                href={`https://twitter.com/${author.social.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Twitter
              </a>
            )}
            {author.social.linkedin && (
              <a
                href={`https://linkedin.com/in/${author.social.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                LinkedIn
              </a>
            )}
            {author.social.github && (
              <a
                href={`https://github.com/${author.social.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                GitHub
              </a>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
});

BlogAuthorCard.displayName = "BlogAuthorCard";
