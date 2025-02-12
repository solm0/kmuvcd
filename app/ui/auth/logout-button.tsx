import { logoutAction } from "../../lib/actions/auth-actions";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button type="submit" className="flex px-5 py-2 bg-neutral-950 text-white text-sm rounded-full hover:bg-neutral-700 transition-colors">
        <LogOut className="w-6 h-6 hover:text-primary" />
        로그아웃
      </button>
    </form>
  );
}