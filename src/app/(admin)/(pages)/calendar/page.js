import Calendar from "@/components/calendar/calendar"
import PageBreadcrumb from "@/components/common/PageBreadCrumb"

export const metadata = {
    title: 'Calendar | Aplikasi Notulensi Rapat Informatika Untan',
    description: 'Calendar Page',
};


export default function CalendarPage() {
    return(
        <div>
            <PageBreadcrumb pageTitle="Calendar"/>
            <Calendar />
        </div>
    )
}