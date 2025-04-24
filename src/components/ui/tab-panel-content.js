import { TabPanel } from "@headlessui/react"
import MeetingCard from "./meeting-card"

export default function TabPanelContent({meetings=[]}) {
    return(    
        <TabPanel className="w-full min-h-[30rem] mb-50 p-4 sm:p-6 md:pd-8 bg-white rounded-lg  transition-all duration-all border border-gray-100 shadow-md ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 cursor-pointer">
            {meetings.map((meeting, index) => (
            <div 
                key={index}
                className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100"
            >
                <MeetingCard name={meeting.name} date={meeting.date} status={meeting.status}/>
            </div>
            ))}
        </div>
        </TabPanel>
    )
}