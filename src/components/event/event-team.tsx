"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import {
  Award,
  ExternalLink,
  Github,
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
      avatar: "/assets/images/team/saleh-shojaei.jpg",
      social: {
        linkedin: "https://www.linkedin.com/in/salehshojaei/",
        twitter: "#",
        github: "#",
        email: "saleh@menteeno.com",
      },
    },
    {
      name: t("event.team.speaker1.name"),
      role: t("event.team.speaker1.role"),
      bio: t("event.team.speaker1.bio"),
      expertise: t("event.team.speaker1.expertise"),
      avatar: "/assets/images/team/amirhossein-darabi.jpg",
      social: {
        linkedin: "https://www.linkedin.com/in/amirhd/",
        twitter: "#",
        github: "#",
        email: "amir@techhouse.com",
      },
    },
    {
      name: t("event.team.speaker2.name"),
      role: t("event.team.speaker2.role"),
      bio: t("event.team.speaker2.bio"),
      expertise: t("event.team.speaker2.expertise"),
      avatar: "/assets/images/team/masoud-bigi.jpg",
      social: {
        linkedin: "https://www.linkedin.com/in/merkousha/",
        twitter: "#",
        github: "#",
        email: "masoud@refhub.com",
      },
    },
    {
      name: t("event.team.speaker3.name"),
      role: t("event.team.speaker3.role"),
      bio: t("event.team.speaker3.bio"),
      expertise: t("event.team.speaker3.expertise"),
      avatar: "/assets/images/team/menteeno-team.jpg",
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#",
        email: "speaker3@menteeno.com",
      },
    },
  ];

  const organizers = [
    {
      name: t("event.team.organizer1.name"),
      role: t("event.team.organizer1.role"),
      company: t("event.team.organizer1.company"),
    },
    {
      name: t("event.team.organizer2.name"),
      role: t("event.team.organizer2.role"),
      company: t("event.team.organizer2.company"),
    },
    {
      name: t("event.team.organizer3.name"),
      role: t("event.team.organizer3.role"),
      company: t("event.team.organizer3.company"),
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <Card key={index} className="p-0 shadow-none border-none">
              <MagicCard
                gradientColor="oklch(72.3% 0.219 149.579 / .15)"
                className="p-0 h-full"
                gradientFrom="oklch(72.3% 0.219 149.579 / .9)"
                gradientTo="oklch(72.3% 0.219 149.579 / .4)"
              >
                <CardContent className="p-6 text-center">
                  <div className="relative mb-4">
                    <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden border-2 border-primary/20">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Badge className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                      {member.role}
                    </Badge>
                  </div>

                  <h3 className="font-semibold text-lg mb-2">{member.name}</h3>

                  <p className="text-muted-foreground text-sm mb-4">
                    {member.bio}
                  </p>

                  <div className="mb-4">
                    <Badge variant="outline" className="text-xs">
                      {member.expertise}
                    </Badge>
                  </div>

                  <div className="flex justify-center gap-2">
                    <a
                      href={member.social.linkedin}
                      className="p-2 hover:bg-primary/10 rounded-full transition-colors duration-200"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="size-4 text-muted-foreground hover:text-primary" />
                    </a>
                    <a
                      href={member.social.twitter}
                      className="p-2 hover:bg-primary/10 rounded-full transition-colors duration-200"
                      aria-label="Twitter"
                    >
                      <Twitter className="size-4 text-muted-foreground hover:text-primary" />
                    </a>
                    <a
                      href={member.social.github}
                      className="p-2 hover:bg-primary/10 rounded-full transition-colors duration-200"
                      aria-label="GitHub"
                    >
                      <Github className="size-4 text-muted-foreground hover:text-primary" />
                    </a>
                    <a
                      href={`mailto:${member.social.email}`}
                      className="p-2 hover:bg-primary/10 rounded-full transition-colors duration-200"
                      aria-label="Email"
                    >
                      <Mail className="size-4 text-muted-foreground hover:text-primary" />
                    </a>
                  </div>
                </CardContent>
              </MagicCard>
            </Card>
          ))}
        </div>

        {/* Event Organizers */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">
            {t("event.team.organizers.title")}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {organizers.map((organizer, index) => (
              <Card
                key={index}
                className="p-6 text-center hover:shadow-md transition-shadow duration-200"
              >
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-primary/15 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Award className="size-8 text-primary" />
                  </div>

                  <h4 className="font-semibold text-lg mb-1">
                    {organizer.name}
                  </h4>

                  <p className="text-muted-foreground text-sm mb-2">
                    {organizer.role}
                  </p>

                  <p className="text-primary text-sm font-medium">
                    {organizer.company}
                  </p>
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
                  href="mailto:event@menteeno.com"
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
