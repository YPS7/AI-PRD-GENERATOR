
export function downloadAsPDF(document: string): void {
  // For now, we'll create a simple text-based PDF download
  // In a real implementation, you'd use jsPDF or similar
  const blob = new Blob([document], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const link = window.document.createElement('a');
  link.href = url;
  link.download = `PRD_${new Date().toISOString().split('T')[0]}.txt`;
  window.document.body.appendChild(link);
  link.click();
  window.document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

export function downloadAsMarkdown(document: string): void {
  const blob = new Blob([document], { type: 'text/markdown' });
  const url = window.URL.createObjectURL(blob);
  const link = window.document.createElement('a');
  link.href = url;
  link.download = `PRD_${new Date().toISOString().split('T')[0]}.md`;
  window.document.body.appendChild(link);
  link.click();
  window.document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

export function formatDocumentForDisplay(document: string): string {
  // Basic formatting for display
  return document
    .replace(/^# /gm, '# ')
    .replace(/^## /gm, '## ')
    .replace(/^### /gm, '### ')
    .trim();
}
