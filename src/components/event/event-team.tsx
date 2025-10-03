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

const EventTeam = () => {
  const { t } = useTranslation();

  const teamMembers = [
    {
      name: t("event.team.organizer.name"),
      role: t("event.team.organizer.role"),
      bio: t("event.team.organizer.bio"),
      expertise: t("event.team.organizer.expertise"),
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
      name: t("event.team.speaker1.name"),
      role: t("event.team.speaker1.role"),
      bio: t("event.team.speaker1.bio"),
      expertise: t("event.team.speaker1.expertise"),
      avatar: getAssetUrl("/assets/images/team/amirhossein-darabi.jpg"),
      social: {
        linkedin: "https://www.linkedin.com/in/amirhd/",
        twitter: "https://x.com/AmirHD_com/",
        github: "https://github.com/amirhd",
        instagram: "https://www.instagram.com/amirhd_com/",
        email: "amirhd.dev@gmail.com",
      },
    },
    {
      name: t("event.team.speaker2.name"),
      role: t("event.team.speaker2.role"),
      bio: t("event.team.speaker2.bio"),
      expertise: t("event.team.speaker2.expertise"),
      avatar: getAssetUrl("/assets/images/team/masoud-bigi.jpg"),
      social: {
        linkedin: "https://www.linkedin.com/in/merkousha/",
        twitter: "https://twitter.com/merkousha",
        github: "https://github.com/merkousha",
        instagram: "https://instagram.com/massoud.beygi",
        email: "merkousha.net@gmail.com",
      },
    },
    {
      name: t("event.team.speaker3.name"),
      role: t("event.team.speaker3.role"),
      bio: t("event.team.speaker3.bio"),
      expertise: t("event.team.speaker3.expertise"),
      avatar: getAssetUrl("/assets/images/team/menteeno-team.jpg"),
      social: {
        linkedin: "https://www.linkedin.com/company/menteeno/",
        github: "https://github.com/menteeno",
        instagram: "https://instagram.com/menteeno.app",
        email: "hi@menteeno.app",
      },
    },
  ];

  const sponsors = [
    {
      name: t("event.team.organizer2.name"),
      role: t("event.team.organizer2.role"),
      company: t("event.team.organizer2.company"),
      logo: "https://frontchapter.ir/images/logo.svg",
      website: "https://frontchapter.ir/",
    },
    {
      name: t("event.team.organizer1.name"),
      role: t("event.team.organizer1.role"),
      company: t("event.team.organizer1.company"),
      logo: "https://tech-house.ir/wp-content/uploads/2025/10/Asset-14@1080x.webp",
      website: "https://tech-house.ir/",
    },
    {
      name: t("event.team.organizer3.name"),
      role: t("event.team.organizer3.role"),
      company: t("event.team.organizer3.company"),
      logo: "https://s3.refhub.ir/assets/images/logo.png",
      website: "https://refhub.ir/",
    },
  ];

  return (
    <div id="team" className="py-16 sm:py-20 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {t("event.team.title")}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("event.team.description")}
          </p>
        </div>

        {/* Main Team Members */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
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
                <CardContent className="p-6 text-center flex flex-col h-full">
                  <div className="relative mb-6">
                    <div className="w-28 h-28 rounded-full mx-auto mb-4 overflow-hidden border-3 border-primary/20 group-hover:border-primary/40 transition-colors duration-300">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <Badge className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground text-xs px-3 py-1">
                      {member.role}
                    </Badge>
                  </div>

                  <h3 className="font-bold text-xl mb-3 text-foreground">
                    {member.name}
                  </h3>

                  <p className="text-muted-foreground text-sm mb-4 flex-grow min-h-[3rem] leading-relaxed">
                    {member.bio}
                  </p>

                  <div className="mb-6">
                    <Badge
                      variant="outline"
                      className="text-xs px-3 py-1 bg-background/50"
                    >
                      {member.expertise}
                    </Badge>
                  </div>

                  <div className="flex justify-center gap-1 mt-auto pt-4 flex-wrap">
                    {member.social.linkedin && (
                      <a
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 hover:bg-muted rounded-full transition-colors duration-200"
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
                        className="p-1.5 hover:bg-muted rounded-full transition-colors duration-200"
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
                        className="p-1.5 hover:bg-muted rounded-full transition-colors duration-200"
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
                        className="p-1.5 hover:bg-muted rounded-full transition-colors duration-200"
                        aria-label="Instagram"
                      >
                        <Instagram className="size-4 text-muted-foreground hover:text-foreground" />
                      </a>
                    )}
                    {member.social.email && (
                      <a
                        href={`mailto:${member.social.email}`}
                        className="p-1.5 hover:bg-muted rounded-full transition-colors duration-200"
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
                        className="p-1.5 hover:bg-muted rounded-full transition-colors duration-200"
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

        {/* Sponsors & Partners */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">
            {t("event.team.organizers.title")}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sponsors.map((sponsor, index) => (
              <Card
                key={index}
                className={`text-center hover:shadow-md transition-all duration-200 group ${
                  index === 1 ? "p-8" : "p-6"
                }`}
              >
                <CardContent className="p-0">
                  <a
                    href={sponsor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div
                      className={`mx-auto mb-4 flex items-center justify-center bg-white rounded-lg shadow-sm group-hover:shadow-md transition-shadow duration-200 p-3 ${
                        index === 1 ? "w-24 h-24" : "w-20 h-20"
                      }`}
                    >
                      <img
                        src={sponsor.logo}
                        alt={sponsor.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </a>

                  <h4
                    className={`mb-1 ${
                      index === 1
                        ? "font-bold text-xl"
                        : "font-semibold text-lg"
                    }`}
                  >
                    {sponsor.name}
                  </h4>

                  <p
                    className={`mb-2 ${
                      index === 1
                        ? "text-muted-foreground text-base"
                        : "text-muted-foreground text-sm"
                    }`}
                  >
                    {sponsor.role}
                  </p>

                  <a
                    href={sponsor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1 text-primary font-medium hover:text-primary/80 transition-colors duration-200 ${
                      index === 1 ? "text-base font-semibold gap-2" : "text-sm"
                    }`}
                  >
                    {sponsor.company}
                    <ExternalLink
                      className={index === 1 ? "size-4" : "size-3"}
                    />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Team */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-foreground mb-4">
                {t("event.team.contact.title")}
              </h3>
              <p className="text-muted-foreground mb-6">
                {t("event.team.contact.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:hi@menteeno.app"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200"
                >
                  <Mail className="size-4" />
                  {t("event.team.contact.email")}
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg font-medium hover:bg-muted transition-colors duration-200"
                >
                  <ExternalLink className="size-4" />
                  {t("event.team.contact.website")}
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EventTeam;
