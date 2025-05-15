import PageBread from "@/components/common/PageBread";
import { DataTableRapat } from "@/components/table/test";


export const metadata = {
    title: 'Dashboard | Aplikasi Notulensi Rapat Informatika Untan',
    description: 'Dashboard Page',
};

export default function Dashboard() {
    return(
        <div>
            <PageBread pageTitle={"Dashboard"}/>
            <DataTableRapat />
        </div>
    )
}