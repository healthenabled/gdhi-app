import PDFDocument from 'pdfkit';
import blobStream from 'blob-stream';

export function generateFormPDF(countrySummary, questionnaire, healthIndicators,i18n) {
  let doc = new PDFDocument();
  let stream = doc.pipe(blobStream());

  doc.fontSize(20)
    .font("Helvetica-Bold")
    .text(i18n.t('healthIndicatorQuestionnaire.pdfTitle', {country: countrySummary.countryName}));
  doc.moveDown();
  doc.fontSize(16)
    .font("Helvetica-Bold")
    .text(i18n.t('healthIndicatorQuestionnaire.contactForm.contactInformation'), {
      underline: true
    });
    doc.moveDown()
  // Country Summary
  doc.fontSize(12)
    .font("Helvetica-Bold")
    .text(i18n.t('healthIndicatorQuestionnaire.contactForm.dateOnWhichDataWasCollected'))
    .font("Helvetica")
    .text(countrySummary.collectedDate || '-')
  doc.moveDown()
    .font("Helvetica-Bold")
    .text(i18n.t('healthIndicatorQuestionnaire.contactForm.nameOfPersonEnteringData'))
    .font("Helvetica")
    .text(countrySummary.dataFeederName || '-')
  doc.moveDown()
    .font("Helvetica-Bold")
    .text(i18n.t('healthIndicatorQuestionnaire.contactForm.roleOfThePersonEnteringData'))
    .font("Helvetica")
    .text(countrySummary.dataFeederRole || '-')
  doc.moveDown()
    .font("Helvetica-Bold")
    .text(i18n.t('healthIndicatorQuestionnaire.contactForm.emailOfThePersonEnteringData'))
    .font("Helvetica")
    .text(countrySummary.dataFeederEmail || '-')
  doc.moveDown()
    .font("Helvetica-Bold")
    .text(i18n.t('healthIndicatorQuestionnaire.contactForm.nameOfTheApprover'))
    .font("Helvetica")
    .text(countrySummary.dataApproverName || '-')
  doc.moveDown()
    .font("Helvetica-Bold")
    .text(i18n.t('healthIndicatorQuestionnaire.contactForm.roleOfTheApprover'))
    .font("Helvetica")
    .text(countrySummary.dataApproverRole || '-')
  doc.moveDown()
    .font("Helvetica-Bold")
    .text(i18n.t('healthIndicatorQuestionnaire.contactForm.emailOfTheApprover'))
    .font("Helvetica")
    .text(countrySummary.dataApproverEmail || '-')
  doc.moveDown()
    .font("Helvetica-Bold")
    .text(i18n.t('healthIndicatorQuestionnaire.contactForm.nameOfTheCountryContact'))
    .font("Helvetica")
    .text(countrySummary.contactName || '-')
  doc.moveDown()
    .font("Helvetica-Bold")
    .text(i18n.t('healthIndicatorQuestionnaire.contactForm.roleOfTheCountryContact'))
    .font("Helvetica")
    .text(countrySummary.contactDesignation || '-')
  doc.moveDown()
    .font("Helvetica-Bold")
    .text(i18n.t('healthIndicatorQuestionnaire.contactForm.emailOfTheCountryContact'))
    .font("Helvetica")
    .text(countrySummary.contactEmail || '-')
  doc.moveDown()
    .font("Helvetica-Bold")
    .text(i18n.t('healthIndicatorQuestionnaire.contactForm.organisationOfTheCountryContact'))
    .font("Helvetica")
    .text(countrySummary.contactOrganization || '-')
  doc.moveDown()
    .font("Helvetica-Bold")
    .text(i18n.t('healthIndicatorQuestionnaire.contactForm.countrySummary'))
    .font("Helvetica")
    .text(countrySummary.summary || '-');
  doc.moveDown();
  doc.fontSize(16)
    .font("Helvetica-Bold")
    .text(i18n.t('healthIndicatorQuestionnaire.resourceForm.resourceInformation'), {
      underline: true
    });
  doc.moveDown();

  if (countrySummary.resources.length === 0)
    doc.fontSize(12)
      .font("Helvetica")
      .text('-');

  for(let i = 0; i < countrySummary.resources.length; i++) {
    doc.fontSize(12)
      .font("Helvetica")
      .text(countrySummary.resources[i] || '-');
  }
  doc.moveDown();

  doc.fontSize(16)
    .font("Helvetica-Bold")
    .text(i18n.t('healthIndicatorQuestionnaire.indicatorDetails'), {
      underline: true
    });
  doc.moveDown();
  questionnaire.forEach((category) => {
    doc.fontSize(16)
      .font("Helvetica-BoldOblique")
      .text(category.categoryName, 72);
      doc.moveDown();
      category.indicators.forEach((indicator) => {
        doc.font("Helvetica")
          .fontSize(12)
          .text(`${indicator.indicatorCode}. ${indicator.indicatorName}`, 72)
          .fillColor("#666")
          .font("Helvetica-Oblique")
          .text(indicator.indicatorDefinition)
          .font("Helvetica");
        doc.moveDown()
          .fillColor("#000");
          indicator.scores.forEach((score) => {
            const fillColor = (healthIndicators[indicator.indicatorId].score === score.score) ? "#666" : "#FFF";
            const fontName = (healthIndicators[indicator.indicatorId].score === score.score) ? "Helvetica-Bold" : "Helvetica";
            if ((doc.y + 20) > 720) doc.addPage();
            const yVal = doc.y;
              doc.circle(76, (yVal + 6) , 6)
                .lineWidth(2)
                .fillAndStroke(fillColor, "#000");
              doc.fillColor("#000")
                .font(fontName)
                .text(score.scoreDefinition, 90)
                .moveDown(0.5);
          });
          doc.moveDown();
          doc.font("Helvetica-Bold")
                .text(i18n.t('healthIndicatorQuestionnaire.rationaleOrSupportingText'));
          doc.font("Helvetica")
            .text(healthIndicators[indicator.indicatorId].supportingText || "-")
          doc.moveDown();
          doc.moveDown();
      });
  });

  stream.on('finish', () => {
    let blob = stream.toBlob('application/pdf');
    if (window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, `${countrySummary.countryName} - Digital Health Questionnaire.pdf`);
    } else {
      let a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      let url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = `${countrySummary.countryName} - Digital Health Questionnaire.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    }
  });
  doc.end();
}
