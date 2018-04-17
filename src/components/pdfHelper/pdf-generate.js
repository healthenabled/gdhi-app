import PDFDocument from 'pdfkit';
import blobStream from 'blob-stream';

export function generateFormPDF(countrySummary, questionnaire, healthIndicators) {
  let doc = new PDFDocument();
  let stream = doc.pipe(blobStream());

  doc.fontSize(20)
    .font("Helvetica-Bold")
    .text(`${countrySummary.countryName} - Digital Health Questionnaire`)
  doc.moveDown()
  doc.fontSize(16)
    .font("Helvetica-Bold")
    .text("Contact Information", {
      underline: true
    });
    doc.moveDown()
  // Country Summary
  doc.fontSize(12)
    .font("Helvetica-Bold")
    .text('Date for which data was collected (DD-MM-YYYY)')
    .font("Helvetica")
    .text(countrySummary.collectedDate)
  doc.moveDown()
    .font("Helvetica-Bold")
    .text('Name of person entering data')
    .font("Helvetica")
    .text(countrySummary.dataFeederName)
  doc.moveDown()
    .font("Helvetica-Bold")
    .text('Role of the person entering data')
    .font("Helvetica")
    .text(countrySummary.dataFeederRole)
  doc.moveDown()
    .font("Helvetica-Bold")
    .text('Email of the person entering data')
    .font("Helvetica")
    .text(countrySummary.dataFeederEmail)
  doc.moveDown()
    .font("Helvetica-Bold")
    .text('Name of the approver')
    .font("Helvetica")
    .text(countrySummary.dataApproverName)
  doc.moveDown()
    .font("Helvetica-Bold")
    .text('Role of the approver')
    .font("Helvetica")
    .text(countrySummary.dataApproverRole)
  doc.moveDown()
    .font("Helvetica-Bold")
    .text('Email of the approver')
    .font("Helvetica")
    .text(countrySummary.dataApproverEmail)
  doc.moveDown()
    .font("Helvetica-Bold")
    .text('Name of the country contact')
    .font("Helvetica")
    .text(countrySummary.contactName)
  doc.moveDown()
    .font("Helvetica-Bold")
    .text('Role of the country contact')
    .font("Helvetica")
    .text(countrySummary.contactDesignation)
  doc.moveDown()
    .font("Helvetica-Bold")
    .text('Email of the country contact')
    .font("Helvetica")
    .text(countrySummary.contactEmail)
  doc.moveDown()
    .font("Helvetica-Bold")
    .text('Organisation of the country contact')
    .font("Helvetica")
    .text(countrySummary.contactOrganization)
  doc.moveDown()
    .font("Helvetica-Bold")
    .text('Country Summary')
    .font("Helvetica")
    .text(countrySummary.summary);
  doc.moveDown();
  doc.fontSize(16)
    .font("Helvetica-Bold")
    .text("Resource Information", {
      underline: true
    });
  doc.moveDown();
  
  for(let i = 0; i < countrySummary.resources.length; i++) {
    doc.fontSize(12)
      .font("Helvetica")
      .text(countrySummary.resources[i]);
  }
  doc.moveDown();

  questionnaire.forEach((category) => {
    doc.fontSize(16)
      .font("Helvetica-Bold")
      .text(category.categoryName, 72);
      doc.moveDown();
      category.indicators.forEach((indicator) => {
        doc.font("Helvetica")
          .fontSize(12)
          .text(`${indicator.indicatorCode}. ${indicator.indicatorName}`, 72)
          .fillColor("#666")
          .text(indicator.indicatorDefinition);
        doc.moveDown()
          .fillColor("#000");
          indicator.scores.forEach((score) => {
            const fillColor = (healthIndicators[indicator.indicatorId].score === score.score) ? "#666" : "#FFF";
            const fontName = (healthIndicators[indicator.indicatorId].score === score.score) ? "Helvetica-Bold" : "Helvetica";
            if ((doc.y + 20) > 720) doc.addPage();
            const yVal = doc.y;

              doc.circle(76, (yVal + 6) , 8)
                .lineWidth(2)
                .fillAndStroke(fillColor, "#000");
              doc.fillColor("#000")
                .font(fontName)
                .text(score.scoreDefinition, 90);
              doc.moveDown();
          })
          doc.moveDown();
          doc.moveDown();
      });
  });

  stream.on('finish', () => {
    let blob = stream.toBlob('application/pdf');
    let a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    let url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = `${countrySummary.countryName} - Digital Health Questionnaire.pdf`;
    a.click();
    window.URL.revokeObjectURL(url);
  });
  doc.end();
}