import { Button } from "@/components/ui/button";

type AuthMode = "signIn" | "signUp";

type AuthModeToggleProps = {
  mode: AuthMode;
  onChange: (mode: AuthMode) => void;
  onReset?: () => void;
};

export function AuthModeToggle({
  mode,
  onChange,
  onReset,
}: AuthModeToggleProps) {
  const handleChange = (nextMode: AuthMode) => {
    onChange(nextMode);
    onReset?.();
  };

  return (
    <div className="flex rounded-full border border-white/10 bg-white/5 p-1">
      <Button
        type="button"
        variant={mode === "signIn" ? "default" : "ghost"}
        size="sm"
        className={`flex-1 rounded-full px-4 py-2 ${
          mode === "signIn"
            ? "bg-white text-slate-950 hover:bg-zinc-100"
            : "text-zinc-300 hover:text-white"
        }`}
        onClick={() => handleChange("signIn")}
      >
        Sign in
      </Button>
      <Button
        type="button"
        variant={mode === "signUp" ? "default" : "ghost"}
        size="sm"
        className={`flex-1 rounded-full px-4 py-2 ${
          mode === "signUp"
            ? "bg-white text-slate-950 hover:bg-zinc-100"
            : "text-zinc-300 hover:text-white"
        }`}
        onClick={() => handleChange("signUp")}
      >
        Sign up
      </Button>
    </div>
  );
}
