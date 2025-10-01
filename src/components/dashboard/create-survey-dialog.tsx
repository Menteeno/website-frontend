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
  const [createSurvey, { isLoading }] = useSurvey_storeMutation();
  const [formData, setFormData] = useState({
    title: "",
    unique_link_slug: "",
    is_active: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("Please enter a survey title");
      return;
    }

    try {
      await createSurvey({
        body: {
          title: formData.title,
          unique_link_slug: formData.unique_link_slug || null,
          is_active: formData.is_active,
        },
      }).unwrap();

      // Reset form
      setFormData({
        title: "",
        unique_link_slug: "",
        is_active: true,
      });

      onSuccess();
    } catch (error) {
      console.error("Failed to create survey:", error);
      alert("Failed to create survey. Please try again.");
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!isLoading) {
      onOpenChange(newOpen);
      if (!newOpen) {
        // Reset form when closing
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
            <DialogTitle>Create New Survey</DialogTitle>
            <DialogDescription>
              Create a new survey to start collecting responses from your
              audience.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Survey Title *</Label>
              <Input
                id="title"
                placeholder="Enter survey title"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="slug">Custom URL Slug (Optional)</Label>
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
              <p className="text-xs text-muted-foreground">
                If left empty, a random slug will be generated
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="active"
                checked={formData.is_active}
                onCheckedChange={(checked: boolean) =>
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
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Survey
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
