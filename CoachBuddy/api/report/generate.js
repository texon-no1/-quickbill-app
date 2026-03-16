/**
 * Dummy Report Generation API
 * POST /api/report/generate
 */
export default async function generateReport(analysisData) {
    console.log(`[API] Generating AI report from analysis data`);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                reportId: 'REP-' + Date.now(),
                summary: '분석이 완료되었습니다.'
            });
        }, 1500);
    });
}
