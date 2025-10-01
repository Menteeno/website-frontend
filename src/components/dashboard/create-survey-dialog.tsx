"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTranslation } from "@/hooks/use-translation";
import { useSurvey_storeMutation } from "@/services/menteenoApi.generated";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface CreateSurveyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function CreateSurveyDialog({
  open,
  onOpenChange,
  onSuccess,
}: CreateSurveyDialogProps) {
  const { t } = useTranslation();
  const [createSurvey, { isLoading }] = useSurvey_storeMutation();
  const [formData, setFormData] = useState({
    title: "",
    unique_link_slug: "",
    is_active: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createSurvey({
        body: {
          title: formData.title,
          unique_link_slug: formData.unique_link_slug || null,
          is_active: formData.is_active,
        },
      }).unwrap();
      onSuccess();
      setFormData({
        title: "",
        unique_link_slug: "",
        is_active: true,
      });
    } catch (error) {
      console.error("Failed to create survey:", error);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!isLoading) {
      onOpenChange(newOpen);
      if (!newOpen) {
        setFormData({
          title: "",
          unique_link_slug: "",
          is_active: true,
        });
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{t("dashboard.create_dialog.title")}</DialogTitle>
            <DialogDescription>
              {t("dashboard.create_dialog.title")}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">
                {t("dashboard.create_dialog.survey_title")} *
              </Label>
              <Input
                id="title"
                placeholder={t(
                  "dashboard.create_dialog.survey_title_placeholder"
                )}
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="slug">
                {t("dashboard.create_dialog.survey_title")} (Optional)
              </Label>
              <Input
                id="slug"
                placeholder="my-survey"
                value={formData.unique_link_slug}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    unique_link_slug: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="active"
                checked={formData.is_active}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, is_active: checked }))
                }
              />
              <Label htmlFor="active">Make survey active immediately</Label>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isLoading}
            >
              {t("dashboard.create_dialog.cancel_button")}
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {t("dashboard.create_dialog.create_button")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
