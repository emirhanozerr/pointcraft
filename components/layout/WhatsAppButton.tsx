'use client'

import React from 'react'

const WhatsAppButton: React.FC = () => {
  const phoneNumber = '905323684879'
  const whatsappUrl = `https://wa.me/${phoneNumber}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp ile iletişime geçin"
      id="whatsapp-floating-button"
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        zIndex: 9999,
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        background: '#25D366',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 14px rgba(37, 211, 102, 0.45)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer',
        textDecoration: 'none',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1)'
        e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.6)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)'
        e.currentTarget.style.boxShadow = '0 4px 14px rgba(37, 211, 102, 0.45)'
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="34"
        height="34"
        fill="#fff"
      >
        <path d="M16.004 2.003A13.934 13.934 0 0 0 2.05 15.98a13.84 13.84 0 0 0 1.878 6.98L2 30l7.212-1.89A13.94 13.94 0 0 0 16.004 30 13.998 13.998 0 0 0 16.004 2.003Zm0 25.578a11.54 11.54 0 0 1-5.89-1.612l-.422-.252-4.378 1.148 1.168-4.27-.276-.44a11.536 11.536 0 0 1-1.77-6.164A11.58 11.58 0 0 1 16.004 4.42 11.58 11.58 0 0 1 27.572 15.99a11.58 11.58 0 0 1-11.568 11.59Zm6.348-8.67c-.348-.174-2.06-1.016-2.38-1.132-.32-.116-.554-.174-.786.174-.232.348-.902 1.132-1.106 1.364-.204.232-.406.262-.754.088-.348-.174-1.47-.542-2.8-1.728-1.034-.922-1.732-2.062-1.936-2.41-.204-.348-.022-.536.152-.71.158-.156.348-.406.522-.61.174-.204.232-.348.348-.58.116-.232.058-.436-.03-.61-.088-.174-.786-1.894-1.078-2.594-.284-.68-.572-.588-.786-.598-.204-.01-.436-.012-.668-.012a1.282 1.282 0 0 0-.928.436c-.32.348-1.222 1.194-1.222 2.912 0 1.718 1.25 3.378 1.424 3.612.174.232 2.46 3.754 5.96 5.264.832.36 1.482.574 1.99.736.836.266 1.596.228 2.198.138.67-.1 2.06-.842 2.35-1.656.29-.814.29-1.512.204-1.658-.088-.146-.32-.232-.668-.408Z" />
      </svg>
    </a>
  )
}

export default WhatsAppButton
