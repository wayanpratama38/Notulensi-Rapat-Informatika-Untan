import Header from "@/components/header";
import Main from "@/components/main";
import { signOut } from "@/lib/auth"

export default function Dashboard() {
    return(
        <>
            <Header />
            {/* <div className="color: rgba(0, 0, 0, var(--tw-text-opacity));">Dashboard</div> */}
            <form
                action={ async(event)=>{
                    "use server"
                    await signOut({redirectTo:'/sign-in'});
                }}
            >
                <button className="bg-red-400">Logout!</button>
            </form>
            <Main/>
        </>
        
    )
}