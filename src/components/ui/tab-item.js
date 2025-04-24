import { Tab } from '@headlessui/react'

export default function TabItem({text}) {
    return(
        <Tab className="flex-shrink-0 data-selected:bg-white px-4 py-1.5 sm:px-6 md:px-8 text-sm rounded-md transition-colors duration-200 whitespace-nowrap">
            {text}
        </Tab>
    )
}