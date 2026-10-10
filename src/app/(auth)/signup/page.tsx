import { redirect } from "next/navigation";

// Accounts are provisioned by the project owner through Supabase Auth.
// Direct visits to this route must never offer public registration.
export default function SignupPage() {
  redirect("/login");
}
