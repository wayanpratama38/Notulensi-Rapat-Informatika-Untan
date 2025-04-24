import SearchBar from "./ui/search-bar";
import SignOut from "./ui/sign-out";
import UserIcon from "./ui/user-icon";

export default function Header() {
    return (
        <header className="sticky top-0 z-30 flex sm:static sm:h-20 sm:border-0 sm:px-6 h-20 items-center gap-4 bg-white px-4 ">
            <SearchBar />
            <UserIcon />
            <SignOut />
        </header>
    )
}