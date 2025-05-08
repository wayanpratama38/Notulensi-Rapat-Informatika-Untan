import Link from "next/link";

const PageBread = ( {pageTitle} ) => { 
    return (
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <h2
                className="text-xl font-semibold text-gray-800 dark:text-white/90"
                x-text="pageName"
            >
                {pageTitle}
            </h2>
            <nav>
                <ol className="flex items-center gap-1.5">
                    <li>
                        <Link
                            className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
                            href="/dashboard"
                        >   
                            Dashboard
                        </Link>
                    </li>
                </ol>
            </nav>
        </div>
    )
}

export default PageBread;