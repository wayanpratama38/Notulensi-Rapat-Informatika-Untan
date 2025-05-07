import PageBreadcrumb from "@/components/common/PageBreadCrumb"

export const metadata = {
    title: 'Dashboard | Aplikasi Notulensi Rapat Informatika Untan',
    description: 'Dashboard Page',
};

export default function Dashboard() {
    return(
        <div>
            <PageBreadcrumb pageTitle="Dashboard"/>
        </div>
    )
}