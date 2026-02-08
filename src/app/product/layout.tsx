export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://unpkg.com/swiper@8/swiper-bundle.min.css" />
        <script src="https://unpkg.com/swiper@8/swiper-bundle.min.js" async></script>
      </head>
      <body style={{
        margin: 0,
        padding: 0,
        height: '100vh',
        overflow: 'hidden',
        fontFamily: '"Montserrat", sans-serif'
      }}>
        {children}
      </body>
    </html>
  );
}