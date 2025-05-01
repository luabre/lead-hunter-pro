
/**
 * Utility functions for exporting data
 */

/**
 * Converts an array of objects to CSV format
 * @param data Array of objects to convert
 * @param headers Custom headers mapping (key: display name)
 * @returns CSV string
 */
export const convertToCSV = (data: any[], headers: Record<string, string>) => {
  if (!data || !data.length) return '';
  
  const headerKeys = Object.keys(headers);
  
  // Create header row
  const headerRow = headerKeys.map(key => `"${headers[key]}"`).join(',');
  
  // Create data rows
  const rows = data.map(item => {
    return headerKeys.map(key => {
      // Handle nested properties using dot notation (e.g. 'creator.name')
      const value = key.includes('.')
        ? key.split('.').reduce((obj, i) => (obj && obj[i] !== undefined ? obj[i] : ''), item)
        : item[key] !== undefined ? item[key] : '';
      
      // Escape quotes and wrap in quotes
      return `"${String(value).replace(/"/g, '""')}"`;
    }).join(',');
  });
  
  // Combine header and data rows
  return [headerRow, ...rows].join('\n');
};

/**
 * Triggers a download of a file
 * @param content File content
 * @param fileName File name
 * @param mimeType MIME type
 */
export const downloadFile = (content: string, fileName: string, mimeType: string) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Exports data as a CSV file
 * @param data Array of objects to export
 * @param headers Custom headers mapping (key: display name)
 * @param fileName File name without extension
 */
export const exportAsCSV = (data: any[], headers: Record<string, string>, fileName: string) => {
  const csv = convertToCSV(data, headers);
  downloadFile(csv, `${fileName}.csv`, 'text/csv;charset=utf-8;');
};
