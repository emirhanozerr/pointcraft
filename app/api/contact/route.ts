import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import nodemailer from 'nodemailer'

// Email sending function
async function sendEmail(data: { name: string; email: string; phone?: string | null; company?: string | null; service?: string | null; message: string; createdAt: Date }) {
  // If SMTP is not defined, just skip emailing to avoid errors during development
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('SMTP configuration missing, skipping email sending.')
    return
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true' || false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
    subject: `Yeni İletişim Formu: ${data.name} - ${data.service || 'Genel'}`,
    html: `
      <h2>Yeni İletişim Formu Gönderimi</h2>
      <p><strong>Ad Soyad:</strong> ${data.name}</p>
      <p><strong>E-posta:</strong> ${data.email}</p>
      <p><strong>Telefon:</strong> ${data.phone || 'Belirtilmedi'}</p>
      <p><strong>Şirket:</strong> ${data.company || 'Belirtilmedi'}</p>
      <p><strong>Hizmet:</strong> ${data.service || 'Belirtilmedi'}</p>
      <p><strong>Mesaj:</strong></p>
      <p>${data.message}</p>
      <hr>
      <p><em>Gönderim Tarihi: ${data.createdAt.toLocaleString('tr-TR')}</em></p>
    `,
  })
}

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

    // Save to Database
    const submission = await prisma.contactSubmission.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        company: body.company,
        service: body.service,
        message: body.message,
      }
    })

    // Try sending email
    try {
      await sendEmail(submission)
    } catch (emailError) {
      console.error('Email sending failed:', emailError)
      // We don't throw here because we still successfully saved the submission
    }

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
