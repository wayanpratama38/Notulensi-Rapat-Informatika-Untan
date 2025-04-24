export default function TabAction() {
    return(
        <div className="ml-auto flex items-start gap-2 ">
            <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-black text-primary-foreground hover:bg-primary/90 rounded-md px-3 h-10 gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e5e1e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-plus-icon lucide-circle-plus">
                <circle cx="12" cy="12" r="10"/>
                <path d="M8 12h8"/><path d="M12 8v8"/>
            </svg>
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap text-white">Add Meeting</span>
            </button>
        </div>
    )
}