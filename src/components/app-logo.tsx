import AppLogoIcon from "./app-logo-icon";

export default function AppLogo({ ...props }) {
  return (
    <div {...props} className="flex gap-2 items-center">
      <div className="flex aspect-square size-10 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
        <AppLogoIcon className="size-8 fill-current text-white dark:text-black" />
      </div>
      <div className="ms-1 grid flex-1 text-start text">
        <span className="mb-0.5 truncate leading-tight font-semibold">
          منتینو
        </span>
      </div>
    </div>
  );
}
