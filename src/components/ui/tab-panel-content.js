import { TabPanel } from "@headlessui/react"

export default function TabPanelContent({text}) {
    return(    
        <TabPanel className="w-full min-h-[500px] p-4 sm:p-6 md:pd-8 bg-white rounded-lg shadow-sm transition-all duration-all border border-gray-100 shadow-md  focus:ring-2 focus:ring-primary-200">
            {text}
        </TabPanel>
    )
}