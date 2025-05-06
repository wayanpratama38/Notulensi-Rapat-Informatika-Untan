import Link from "next/link";

const PageBreadcrumb = ( {pageTitle} ) => { 
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
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="8px" 
                                height="8px" 
                                viewBox="-64 0 512 512"
                            >
	                            <path 
                                    fill="currentColor" 
                                    d="M3.4 81.7c-7.9 15.8-1.5 35 14.3 42.9L280.5 256L17.7 387.4c-15.8 7.9-22.2 27.1-14.3 42.9s27.1 22.2 42.9 14.3l320-160c10.8-5.4 17.7-16.5 17.7-28.6s-6.8-23.2-17.7-28.6l-320-160c-15.8-7.9-35-1.5-42.9 14.3" 
                                    />
                            </svg>
                        </Link>
                    </li>
                    <li className="text-sm text-gray-800 dark:text-white/90">
                        {pageTitle}
                    </li>
                </ol>
            </nav>
        </div>
    )
}

export default PageBreadcrumb;