import { jsPDF } from "jspdf";

// This function now generates an accessible, text-based PDF with proper scaling.
export const exportToPdf = (element: HTMLElement | null) => {
  if (!element) {
    console.error("Preview element not found for PDF export.");
    return;
  }

  const doc = new jsPDF({
    orientation: 'p', // portrait
    unit: 'pt',       // points
    format: 'a4'      // A4 paper size
  });

  // The .html() method with these options provides better scaling.
  doc.html(element, {
    callback: function (doc) {
      doc.save('document.pdf');
    },
    // This option helps with content that spans multiple pages.
    autoPaging: 'slice',
    width: 595, // A4 width in points
    windowWidth: element.scrollWidth,
    margin: [40, 40, 40, 40]
  });
};


// The other export functions remain the same
export const exportToHtml = (html: string) => {
  const blob = new Blob([`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Exported HTML</title>
    </head>
    <body style="font-family: sans-serif; padding: 2rem;">
      ${html}
    </body>
    </html>
  `], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'export.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const exportToMarkdown = (markdown: string) => {
  const blob = new Blob([markdown], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'export.md';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
