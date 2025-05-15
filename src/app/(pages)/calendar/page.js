import Calendar from "@/components/calendar/calendar"
import PageBreadcrumb from "@/components/common/PageBreadCrumb"

export const metadata = {
    title: 'Calendar | Aplikasi Notulensi Rapat Informatika Untan',
    description: 'Calendar Page',
};


export default function CalendarPage() {
    return(
        <div className="flex h-full flex-col">
            <PageBreadcrumb pageTitle="Calendar" className="flex-shrink-0"/>
            <div className="flex-1 min-h-0">
                <Calendar />
            </div>
        </div>
    )
}