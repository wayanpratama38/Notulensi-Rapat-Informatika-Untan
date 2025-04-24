import TabList from "./ui/tab-list";

export default function Main() {
    return (
        <main className="flex-auto items-start gap-2 p-4 sm:px-6 sm:py-0 md:gap-4 bg-muted/40">
            <div dir="ltr" dataorientation="horizontal">
                <TabList />
            </div>
        </main>
    )
}