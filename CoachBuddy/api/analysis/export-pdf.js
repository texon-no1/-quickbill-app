/**
 * Dummy PDF Export API
 * POST /api/analysis/export-pdf
 */
export default async function exportPDF(reportId) {
    console.log(`[API] Exporting report ${reportId} to PDF`);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                downloadUrl: `https://storage.coachbuddy.ai/reports/${reportId}.pdf`
            });
        }, 2000);
    });
}
