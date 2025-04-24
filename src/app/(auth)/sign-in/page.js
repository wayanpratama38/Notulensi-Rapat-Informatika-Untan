'use server'

import GoogleSignIn from "@/components/google-sign-in";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
    const session = await auth();
    return session ? redirect("/dashboard"):(<GoogleSignIn/>)
}