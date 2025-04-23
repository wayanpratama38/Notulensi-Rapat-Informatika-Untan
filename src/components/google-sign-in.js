import {signIn, signOut, auth} from "@/lib/auth";


export default async function GoogleSignIn() {
    const session  = await auth();
    return(
        <form
        action={async () => {
            "use server";
            await signIn("google",{redirectTo:'/'});
        }}>
            <button>Sign In With Google</button>
        </form>
    )
}