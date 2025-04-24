import {signIn} from "@/lib/auth";


export default async function GoogleSignIn() {
    return(
        <form
        action={async () => {
            "use server";
            await signIn("google",{redirectTo:'/dashboard'});
        }}>
            <button>Sign In With Google</button>
        </form>
    )
}