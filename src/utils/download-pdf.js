export function downloadPdf(blob, fileName) {
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    setTimeout(() => {
        document.body.removeChild(anchor);
        URL.revokeObjectURL(url);
    }, 100);
}