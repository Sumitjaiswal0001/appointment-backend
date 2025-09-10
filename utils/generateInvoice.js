import PDFDocument from 'pdfkit'
import fs from 'fs'
import path from 'path'

export const generateInvoice = async (user, docId, slotDate, slotTime) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument()
    const filePath = path.join('invoices', `${user._id}_${Date.now()}.pdf`)
    const writeStream = fs.createWriteStream(filePath)
    doc.pipe(writeStream)

    doc.fontSize(20).text('Appointment Invoice', { align: 'center' })
    doc.moveDown()
    doc.fontSize(12).text(`Patient Name: ${user.name}`)
    doc.text(`Patient Email: ${user.email}`)
    doc.text(`Doctor Name: Dr. ${doctor.name}`)
    doc.text(`Speciality: ${doctor.speciality}`)
    doc.text(`Appointment Date: ${slotDate.replace(/_/g, '/')}`)
    doc.text(`Time: ${slotTime}`)
    doc.text(`Fees: ₹${doctor.fees}`)
    doc.text(`Invoice Date: ${new Date().toLocaleString()}`)
    doc.end()

    writeStream.on('finish', () => resolve(filePath))
    writeStream.on('error', reject)
  })
}
