import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

// Admin panel data storage - form submissions saved to JSON file
const DATA_DIR = path.join(process.cwd(), 'data', 'submissions')
const SUBMISSIONS_FILE = path.join(DATA_DIR, 'contacts.json')

interface ContactSubmission {
  id: string
  name: string
  email: string
  phone: string
  company: string
  service: string
  message: string
  timestamp: string
  read: boolean
}

async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR)
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true })
  }
}

async function getSubmissions(): Promise<ContactSubmission[]> {
  try {
    const data = await fs.readFile(SUBMISSIONS_FILE, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

async function saveSubmissions(submissions: ContactSubmission[]) {
  await ensureDataDir()
  await fs.writeFile(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2))
}

// Email sending function (inactive - uncomment and configure when ready)
// async function sendEmail(data: ContactSubmission) {
//   const nodemailer = require('nodemailer')
//   const transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: parseInt(process.env.SMTP_PORT || '587'),
//     secure: false,
//     auth: {
//       user: process.env.SMTP_USER,
//       pass: process.env.SMTP_PASS,
//     },
//   })
//
//   await transporter.sendMail({
//     from: process.env.SMTP_FROM || 'noreply@pointcraft.com',
//     to: process.env.CONTACT_EMAIL || 'info@pointcraft.com',
//     subject: `Yeni İletişim Formu: ${data.name} - ${data.service}`,
//     html: `
//       <h2>Yeni İletişim Formu Gönderimi</h2>
//       <p><strong>Ad Soyad:</strong> ${data.name}</p>
//       <p><strong>E-posta:</strong> ${data.email}</p>
//       <p><strong>Telefon:</strong> ${data.phone || 'Belirtilmedi'}</p>
//       <p><strong>Şirket:</strong> ${data.company || 'Belirtilmedi'}</p>
//       <p><strong>Hizmet:</strong> ${data.service || 'Belirtilmedi'}</p>
//       <p><strong>Mesaj:</strong></p>
//       <p>${data.message}</p>
//       <hr>
//       <p><em>Gönderim Tarihi: ${data.timestamp}</em></p>
//     `,
//   })
// }

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { name, email, message } = body
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email and message are required' },
        { status: 400 }
      )
    }

    const submission: ContactSubmission = {
      id: Date.now().toString(36) + Math.random().toString(36).substring(2, 8),
      name: body.name,
      email: body.email,
      phone: body.phone || '',
      company: body.company || '',
      service: body.service || '',
      message: body.message,
      timestamp: new Date().toISOString(),
      read: false,
    }

    // Save to admin panel (JSON file)
    const submissions = await getSubmissions()
    submissions.unshift(submission)
    await saveSubmissions(submissions)

    // Email sending (uncomment when SMTP is configured)
    // await sendEmail(submission)

    return NextResponse.json(
      { success: true, message: 'Contact form submitted successfully', id: submission.id },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET endpoint - for admin panel to retrieve submissions
export async function GET() {
  try {
    const submissions = await getSubmissions()
    return NextResponse.json({ submissions, total: submissions.length })
  } catch (error) {
    console.error('Error fetching submissions:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
