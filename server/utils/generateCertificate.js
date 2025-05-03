// const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
// const fs = require('fs');
// const path = require('path');

// const generateCertificate = async ({ studentName, courseTitle, instructorName }) => {
//   const pdfDoc = await PDFDocument.create();
//   const page = pdfDoc.addPage([600, 400]);
//   const { width, height } = page.getSize();

//   const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
//   const titleFontSize = 24;
//   const bodyFontSize = 16;

//   page.drawText('Certificate of Completion', {
//     x: 150,
//     y: height - 80,
//     size: titleFontSize,
//     font,
//     color: rgb(0.2, 0.2, 0.2),
//   });

//   page.drawText(`${studentName}`, {
//     x: 100,
//     y: height - 140,
//     size: bodyFontSize,
//     font,
//     color: rgb(0, 0, 0.8),
//   });

//   page.drawText(`has successfully completed`, {
//     x: 100,
//     y: height - 160,
//     size: bodyFontSize,
//     font,
//     color: rgb(0, 0, 0),
//   });

//   page.drawText(`${courseTitle}`, {
//     x: 100,
//     y: height - 180,
//     size: bodyFontSize,
//     font,
//     color: rgb(0, 0.6, 0),
//   });

//   page.drawText(`Instructor: ${instructorName}`, {
//     x: 100,
//     y: height - 220,
//     size: bodyFontSize,
//     font,
//     color: rgb(0.4, 0.4, 0.4),
//   });

//   const pdfBytes = await pdfDoc.save();
//   return pdfBytes;
// };

// module.exports = generateCertificate;
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const generateCertificate = ({ userName, courseTitle, outputPath }) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', layout: 'landscape' });

    const writeStream = fs.createWriteStream(outputPath);
    doc.pipe(writeStream);

    // Design
    doc.fontSize(28).text('Certificate of Completion', { align: 'center' });
    doc.moveDown();
    doc.fontSize(20).text(`This is to certify that`, { align: 'center' });
    doc.fontSize(26).text(userName, { align: 'center', underline: true });
    doc.moveDown();
    doc.fontSize(20).text(`has successfully completed the course`, { align: 'center' });
    doc.fontSize(24).text(courseTitle, { align: 'center', underline: true });

    doc.end();

    writeStream.on('finish', () => resolve(outputPath));
    writeStream.on('error', reject);
  });
};

export default generateCertificate;
