import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mentoria Agropecuária LB | Lucas Borba',
  description: 'Aprenda estratégias de mercado, gestão e otimização em agropecuária com a mentoria especializada de Lucas Borba.',
  keywords: ['mentoria agropecuária', 'Lucas Borba', 'gestão rural', 'agronegócio', 'Agropecuária LB'],
  openGraph: {
    title: 'Mentoria Agropecuária LB',
    description: 'Estratégias avançadas para alavancar os seus resultados no agronegócio.',
    url: 'https://mentoria-lb.netlify.app/',
    siteName: 'Mentoria LB',
    images: [
      {
        url: 'https://mentoria-lb.netlify.app/logo.webp',
        width: 800,
        height: 600,
        alt: 'Logo Agropecuária LB',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>

        {/*Google tag (gtag.js)*/}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-R4C8YMEJZV"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-R4C8YMEJZV');
            `,
          }}
        />

        {/*Código do Pixel do Facebook*/}
        <Script
          id="facebook-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '974661415006489');
              fbq('track', 'PageView');
            `,
          }}
        />
        
        <noscript>
          <img 
            height="1" 
            width="1" 
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=974661415006489&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        {children}
      </body>
    </html>
  );
}
