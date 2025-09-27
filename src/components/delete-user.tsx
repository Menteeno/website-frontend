import HeadingSmall from "@/components/heading-small";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";

export default function DeleteUser() {
  const passwordInput = useRef<HTMLInputElement>(null);
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState<{ password?: string }>({});

  return (
    <div className="space-y-6">
      <HeadingSmall
        title="Delete account"
        description="Delete your account and all of its resources"
      />
      <div className="space-y-4 rounded-lg border border-red-100 bg-red-50 p-4 dark:border-red-200/10 dark:bg-red-700/10">
        <div className="relative space-y-0.5 text-red-600 dark:text-red-100">
          <p className="font-medium">Warning</p>
          <p className="text-sm">
            Please proceed with caution, this cannot be undone.
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive">Delete account</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>
              Are you sure you want to delete your account?
            </DialogTitle>
            <DialogDescription>
              Once your account is deleted, all of its resources and data will
              also be permanently deleted. Please enter your password to confirm
              you would like to permanently delete your account.
            </DialogDescription>

            <form
              method="post"
              action="/profile/destroy"
              onSubmit={(e) => {
                e.preventDefault();
                setProcessing(true);
                // TODO: Implement actual delete logic
                console.log("Delete account");
              }}
              className="space-y-6"
            >
              <div className="grid gap-2">
                <Label htmlFor="password" className="sr-only">
                  Password
                </Label>

                <Input
                  id="password"
                  type="password"
                  name="password"
                  ref={passwordInput}
                  placeholder="Password"
                  autoComplete="current-password"
                />

                {errors.password && <InputError message={errors.password} />}
              </div>

              <DialogFooter className="gap-2">
                <DialogClose asChild>
                  <Button variant="secondary" onClick={() => setErrors({})}>
                    Cancel
                  </Button>
                </DialogClose>

                <Button variant="destructive" disabled={processing} asChild>
                  <button type="submit">Delete account</button>
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
