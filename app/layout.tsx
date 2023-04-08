import './globals.css'

export const metadata = {
  title: 'soullink',
  description: 'got our souls linked up'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
