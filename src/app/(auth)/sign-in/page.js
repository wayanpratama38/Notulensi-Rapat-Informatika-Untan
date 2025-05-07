'use server'

import GoogleSignIn from "@/components/ui/google-sign-in";
import SignInCard from "@/components/ui/sign-in-card";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
    const session = await auth();
    if (session) {
        redirect("/dashboard");
    }

    return <SignInCard/>
}