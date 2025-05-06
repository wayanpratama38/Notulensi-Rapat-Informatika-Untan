import Calendar from "@/components/calendar/calendar"
import PageBreadcrumb from "@/components/common/PageBreadCrumb"

export default function CalendarPage() {
    return(
        <div>
            <PageBreadcrumb pageTitle="Calendar"/>
            <Calendar />
        </div>
    )
}