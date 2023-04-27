import ReportPage from '@/pages/ReportPage/ReportPage';

type HomeParams = {
    searchParams?: { [key: string]: string };
};

const getReport = async (params: HomeParams) => {
    const response = await fetch(`${process.env.DOMAIN}/api/report?${new URLSearchParams(params.searchParams)}`);
    const report = await response.json();
    return report;
};

export default async function Home(params: HomeParams) {
    const report = await getReport(params);
    return <ReportPage {...report} />;
}
