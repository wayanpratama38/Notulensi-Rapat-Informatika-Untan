import { redirect } from 'next/navigation';

export default function AdminNotFound() {
  return redirect("/dashboard");
} 