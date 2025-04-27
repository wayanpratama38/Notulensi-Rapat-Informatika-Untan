import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import TabItem from './tab-item'
import TabAction from './tab-action'
import TabPanelContent from './tab-panel-content'



export default function TabComponent() {
    return(
      <TabGroup className="w-full">
        <div className="flex items-center justify-between gap-4 mb-2"> {/* Container baru untuk alignment */}
          <TabList>
            <div className="inline-flex items-center bg-gray-300 gap-4 h-10 rounded-md bg-muted sm:p-2 p-5 text-muted-foreground">
              <TabItem text={"All"}/>
              <TabItem text={"Active"}/>
              <TabItem text={"Archived"}/>
            </div>
          </TabList>
          <TabAction />
        </div>
        
        <TabPanels className="mt-3 w-full">
          <TabPanelContent meetings={[
            {
                name : "Rapat Tim Marketing",
                date : "2024-03-25T09:00:00",
                status : "active",
                id : "123"
            },
            {
                name : "Rapat Tim IT",
                date : "2024-03-25T09:00:00",
                status : "finished",
                id : "124"
            },
            {
                name : "Rapat Tim IT",
                date : "2024-03-25T09:00:00",
                status : "finished",
                id : "125"
            },
            {
                name : "Rapat Tim IT",
                date : "2024-03-25T09:00:00",
                status : "finished",
                id : "126"
            },
            {
                name : "Rapat Tim IT",
                date : "2024-03-25T09:00:00",
                status : "finished",
                id : "127"
            },
            {
                name : "Rapat Tim IT",
                date : "2024-03-25T09:00:00",
                status : "finished",
                id : "128"
            },
            {
                name : "Rapat Tim IT",
                date : "2024-03-25T09:00:00",
                status : "finished",
                id : "129"
            }
          ]}/>
        </TabPanels>
      </TabGroup>
    )
  }
