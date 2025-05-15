import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { DataTableDosen } from "@/components/table/dosen-table";

export const metadata = {
  title: 'Kelola Dosen | Aplikasi Notulensi Rapat Informatika Untan',
  description: 'Halaman pengelolaan akun dosen',
};

export default function DosenPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Kelola Dosen" />
      <DataTableDosen />
    </div>
  );
}
