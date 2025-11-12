"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import { getAssetUrl } from "@/lib/config";
import {
  ExternalLink,
  Github,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  Twitter,
} from "lucide-react";
import { MagicCard } from "../magicui/magic-card";

export const AboutUsTeam = () => {
  const { t } = useTranslation();

  // Helper function to get social link, returning undefined if empty or same as key
  const getSocialLink = (key: string): string | undefined => {
    const val = t(key)?.trim();
    return val && val !== key && val !== "" ? val : undefined;
  };

  const teamMembers = [
    {
      name: t("about.team.member1.name"),
      role: t("about.team.member1.role"),
      bio: t("about.team.member1.bio"),
      avatar: getAssetUrl("/assets/images/team/saleh-shojaei.jpg"),
      social: {
        linkedin: "https://www.linkedin.com/in/salehshojaei/",
        github: "https://github.com/ssshojaei",
        email: "saleh@menteeno.app",
        instagram: "https://instagram.com/roxaleh",
        blog: "https://roxaleh.ir",
      },
    },
    {
      name: t("about.team.member2.name"),
      role: t("about.team.member2.role"),
      bio: t("about.team.member2.bio"),
      avatar: getAssetUrl("/assets/images/team/ali-golkar.jpg"),
      social: {
        linkedin: getSocialLink("about.team.member2.social.linkedin"),
        github: getSocialLink("about.team.member2.social.github"),
        email: getSocialLink("about.team.member2.social.email"),
        instagram: getSocialLink("about.team.member2.social.instagram"),
      },
    },
    {
      name: t("about.team.member3.name"),
      role: t("about.team.member3.role"),
      bio: t("about.team.member3.bio"),
      avatar: getAssetUrl("/assets/images/team/reyhane-maleki.jpg"),
      social: {
        linkedin: getSocialLink("about.team.member3.social.linkedin"),
        github: getSocialLink("about.team.member3.social.github"),
        email: getSocialLink("about.team.member3.social.email"),
        instagram: getSocialLink("about.team.member3.social.instagram"),
      },
    },
    {
      name: t("about.team.member4.name"),
      role: t("about.team.member4.role"),
      bio: t("about.team.member4.bio"),
      avatar: getAssetUrl("/assets/images/team/pardis-shojaei.jpg"),
      social: {
        linkedin: getSocialLink("about.team.member4.social.linkedin"),
        github: getSocialLink("about.team.member4.social.github"),
        email: getSocialLink("about.team.member4.social.email"),
        instagram: getSocialLink("about.team.member4.social.instagram"),
      },
    },
  ];

  return (
    <div id="team" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-8 lg:mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
          {t("about.team.title")}
        </h2>
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
          {t("about.team.description")}
        </p>
      </div>

      {/* Main Team Members */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="p-0 shadow-none border-none h-full group hover:shadow-lg transition-all duration-300"
            >
              <MagicCard
                gradientColor="oklch(72.3% 0.219 149.579 / .15)"
                className="p-0 h-full flex flex-col"
                gradientFrom="oklch(72.3% 0.219 149.579 / .9)"
                gradientTo="oklch(72.3% 0.219 149.579 / .4)"
              >
                <CardContent className="p-5 text-center flex flex-col h-full">
                  <div className="relative mb-4">
                    <div className="w-24 h-24 rounded-full mx-auto mb-3 overflow-hidden border-2 border-primary/20 group-hover:border-primary/40 transition-colors duration-300 bg-muted">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-semibold text-lg">${member.name.split(' ').map(n => n[0]).join('')}</div>`;
                          }
                        }}
                      />
                    </div>
                    <Badge className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground text-[10px] px-2 py-0.5 whitespace-nowrap">
                      {member.role}
                    </Badge>
                  </div>

                  <h3 className="font-bold text-lg mb-2 text-foreground">
                    {member.name}
                  </h3>

                  <p className="text-muted-foreground text-xs mb-4 leading-relaxed flex-grow">
                    {member.bio}
                  </p>

                  <div className="flex justify-center gap-1.5 mt-auto pt-3 flex-wrap">
                    {member.social.linkedin && (
                      <a
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-muted rounded-full transition-colors duration-200"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="size-4 text-muted-foreground hover:text-foreground" />
                      </a>
                    )}
                    {member.social.twitter && (
                      <a
                        href={member.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-muted rounded-full transition-colors duration-200"
                        aria-label="Twitter"
                      >
                        <Twitter className="size-4 text-muted-foreground hover:text-foreground" />
                      </a>
                    )}
                    {member.social.github && (
                      <a
                        href={member.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-muted rounded-full transition-colors duration-200"
                        aria-label="GitHub"
                      >
                        <Github className="size-4 text-muted-foreground hover:text-foreground" />
                      </a>
                    )}
                    {member.social.instagram && (
                      <a
                        href={member.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-muted rounded-full transition-colors duration-200"
                        aria-label="Instagram"
                      >
                        <Instagram className="size-4 text-muted-foreground hover:text-foreground" />
                      </a>
                    )}
                    {member.social.email && (
                      <a
                        href={`mailto:${member.social.email}`}
                        className="p-2 hover:bg-muted rounded-full transition-colors duration-200"
                        aria-label="Email"
                      >
                        <Mail className="size-4 text-muted-foreground hover:text-foreground" />
                      </a>
                    )}
                    {member.social.blog && (
                      <a
                        href={member.social.blog}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-muted rounded-full transition-colors duration-200"
                        aria-label="Blog"
                      >
                        <Globe className="size-4 text-muted-foreground hover:text-foreground" />
                      </a>
                    )}
                  </div>
                </CardContent>
              </MagicCard>
            </Card>
          ))}
      </div>
    </div>
  );
};

