import './globals.css';
import Link from 'next/link';
import style from './layout.module.css';
import Footer from './components/footer';

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <div className={style.container}>
          <header>
            <Link href={'/'}>📚 ONEBITE BOOKS</Link>
          </header>
          <main>{children}</main>
          <Footer />
        </div>
        {/* modal */}
        <div id='modal-root'></div>
        {modal}
      </body>
    </html>
  );
}
