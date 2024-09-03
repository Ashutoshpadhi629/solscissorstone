import { ModeToggle } from "./mode-toggler";

export function Appbar() {
  return (
    <div className="fixed z-30 w-screen bg-black h-12 text-end p-2 bg-opacity-80 shadow-md">
      <ModeToggle />
    </div>
  );
}
