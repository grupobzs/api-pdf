const fs = require("fs");
const path = require("path");
const { PDFDocument, rgb } = require("pdf-lib");

async function generateCertificate(req, res) {
    const { nome, curso, dataConclusao, templateId } = req.body;

    // Caminho para o template de PDF com base no `templateId`
    const templatePath = path.join(__dirname, "../../templates", `${templateId}.pdf`);

    if (!fs.existsSync(templatePath)) {
        return res.status(404).send("Template não encontrado");
    }

    // Carregar o template de PDF
    const existingPdfBytes = fs.readFileSync(templatePath);
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    // Customizar o conteúdo no template
    firstPage.drawText(nome, { x: 300, y: 400, size: 24, color: rgb(0, 0, 0) });
    firstPage.drawText(curso, { x: 300, y: 350, size: 18, color: rgb(0, 0, 0) });
    firstPage.drawText(dataConclusao, { x: 300, y: 300, size: 18, color: rgb(0, 0, 0) });

    // Gerar o PDF e enviar ao usuário
    const pdfBytes = await pdfDoc.save();
    res.setHeader("Content-Type", "application/pdf");
    res.send(Buffer.from(pdfBytes));
}

module.exports = { generateCertificate };
