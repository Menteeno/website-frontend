"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
    <Card className="mt-12 mb-8">
      <CardHeader>
        <div className="flex items-start gap-4">
          {author.avatar ? (
            <img
              src={author.avatar}
              alt={author.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-border"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center border-2 border-border">
              <span className="text-2xl font-bold text-muted-foreground">
                {author.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <div className="flex-1">
            <h3
              className="text-xl font-semibold text-foreground mb-2"
              dir={isRTL ? "rtl" : "ltr"}
            >
              {author.name}
            </h3>
            {author.bio && (
              <p
                className="text-muted-foreground leading-relaxed"
                dir={isRTL ? "rtl" : "ltr"}
              >
                {author.bio}
              </p>
            )}
          </div>
        </div>
      </CardHeader>
      {author.social && (
        <CardContent className="pt-0">
          <div className="flex gap-4">
            {author.social.twitter && (
              <a
                href={
                  author.social.twitter.startsWith("http")
                    ? author.social.twitter
                    : `https://twitter.com/${author.social.twitter}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Twitter
              </a>
            )}
            {author.social.linkedin && (
              <a
                href={
                  author.social.linkedin.startsWith("http")
                    ? author.social.linkedin
                    : `https://linkedin.com/in/${author.social.linkedin}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                LinkedIn
              </a>
            )}
            {author.social.github && (
              <a
                href={
                  author.social.github.startsWith("http")
                    ? author.social.github
                    : `https://github.com/${author.social.github}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                GitHub
              </a>
            )}
            {author.social.blog && (
              <a
                href={author.social.blog}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Blog
              </a>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
});

BlogAuthorCard.displayName = "BlogAuthorCard";
