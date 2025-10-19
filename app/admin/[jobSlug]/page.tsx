import { ApplicantTable } from "./_components/ApplicantTable";

type AdminManageJobPageProps = {
  params: Promise<{ jobSlug: string }>;
};

const AdminManageJobPage = async ({ params }: AdminManageJobPageProps) => {
  const { jobSlug } = await params;

  return (
    <div className="flex flex-col gap-6">
      <span className="text-lg font-bold">{jobSlug}</span>

      <div className="border border-neutral-40 rounded-lg p-6">
        <ApplicantTable />
      </div>
    </div>
  );
};

export default AdminManageJobPage;
