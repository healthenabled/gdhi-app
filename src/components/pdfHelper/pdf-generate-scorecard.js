import PDFDocument from 'pdfkit';
import blobStream from 'blob-stream';
import colorObj from "../common/color-codes.js";

export function generateScorecard(healthIndicatorData) {
  let doc = new PDFDocument({
    margin: 50
  });
  let stream = doc.pipe(blobStream());
  let yVal = 0;

  const colorCodes = colorObj.getColorCodes();

  doc.fontSize(20)
    .font("Helvetica-Bold")
    .text(`${healthIndicatorData.countryName} - Scorecard`);

  doc.fontSize(14)
    .font("Helvetica-BoldOblique")
    .fillColor("#666")
    .text(`As on ${healthIndicatorData.collectedDate}`);
  doc.moveDown();
  doc.moveDown();

  yVal = doc.y;
  
  doc.fontSize(14)
    .fillColor("#000000")
    .font("Helvetica-Bold")
    .text("Overall Digital Health Phase", {
      width: 500
    });
  const countryPhase = healthIndicatorData.countryPhase ? healthIndicatorData.countryPhase.toString() : "NA";
  doc.roundedRect(520, yVal - 16, 32, 32, 5)
    .fill(getColorCodeForPhase(colorCodes, countryPhase));

  doc.fillColor("#FFF")
    .text(countryPhase, 520, yVal - 6, {
      width: 32,
      align: 'center'
    });
  doc.moveDown();    
  doc.lineWidth(2);

  doc.moveTo(50, doc.y)
    .lineTo(560, doc.y)
    .strokeColor("#CCC")
    .stroke();

  healthIndicatorData.categories.forEach((category) => {
    doc.moveDown();
    doc.moveDown();
    yVal = doc.y;

    doc.fontSize(14)
      .fillColor("#000000")
      .font("Helvetica-Bold")
      .text(category.name, 50, doc.y, {
        width: 500
      });
    
    doc.lineWidth(15);

    doc.lineCap('round')
      .moveTo(60, doc.y + 10)
      .lineTo(560, doc.y + 10)
      .strokeColor("#CCC")
      .stroke();
    const categoryPhase = category.phase ? category.phase.toString() : "NA";
    const progressFillWidth =  (60 + (((560 - 60) / 5) * Number(category.phase)));
    doc.lineCap('round')
      .moveTo(60, doc.y + 10)
      .lineTo(progressFillWidth, doc.y + 10)
      .strokeColor(getColorCodeForPhase(colorCodes, categoryPhase))
      .stroke();
    doc.font("Helvetica")
      .fillColor("#FFF")
      .fontSize(14)
      .text(`Phase ${categoryPhase}`, (progressFillWidth - 48), doc.y + 5);

    doc.moveDown(0.5);
    yVal = doc.y;
    let initialYVal = 0;
    let scoreYVal = 0;
    let endYVal = 0;
    category.indicators.forEach((indicator) => {
      if ((doc.y + 220) > 840) {
        doc.addPage();
      } else {
        doc.moveDown();
      }
      initialYVal = doc.y;
      doc.font("Helvetica")
        .fontSize(12)
        .fillColor("#000")
        .text(`${indicator.code}. ${indicator.name}`, 50, doc.y, {
        width: 440
      });
      doc.fillColor("#666")
        .font("Helvetica-Oblique") 
        .text(indicator.indicatorDescription, 50, doc.y, {
          width: 440
        });
      doc.moveDown();
      doc.fillColor("#4A90E2")
        .font("Helvetica")
        .text(indicator.scoreDescription, 50, doc.y, {
          width: 440
        });

      endYVal = doc.y;

      doc.moveDown();
      doc.lineWidth(0.5);

      doc.moveTo(50, endYVal + 15)
        .lineTo(560, endYVal + 15)
        .strokeColor("#CCC")
        .stroke();
        
      doc.moveDown();
      //score box yValue computation startYVal + ((endYVal - startYVal) / 2) - (scoreBoxHeight / 2)
      //adjust benchmark height to align center 
      scoreYVal = initialYVal + (((endYVal - initialYVal) / 2) - 16);
      let indicatorScore = indicator.score ? indicator.score.toString() : "NA";
      doc.roundedRect(520, scoreYVal, 32, 32, 5)
        .fill(colorCodes.filter((colorVal) => colorVal.score === indicatorScore)[0].color);

      doc.fontSize(14)
        .font("Helvetica-Bold")
        .fillColor("#FFF")
        .text(indicatorScore, 520, (scoreYVal + 10) , {
          width: 32,
          align: 'center'
        });

      // to reset doc.y position in PDFKit, As the doc.y position is updated as soon as we add text  
      doc.text("", 50, endYVal + 25);
    })
  })
  
  stream.on('finish', () => {
    let blob = stream.toBlob('application/pdf');
    if (window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, `${healthIndicatorData.countryName} - Scorecard.pdf`);
    } else {
      let a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      let url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = `${healthIndicatorData.countryName} - Scorecard.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    }
  });
  doc.end();
}

export function getColorCodeForPhase(colorCodes, phaseValue) {
  return colorCodes.filter((colorVal) => colorVal.score === phaseValue)[0].color;
}