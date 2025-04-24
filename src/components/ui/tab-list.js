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
          <TabPanelContent text={"Content 1"}/>
          <TabPanelContent text={"Content 2"}/>
          <TabPanelContent text={"Content 3"}/>
        </TabPanels>
      </TabGroup>
    )
  }
