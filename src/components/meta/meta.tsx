import basicSettings from '../../data/basic_setting.json';

interface MetaInfo {
  charSet: string;
  title: string;
  description: string;
  og_image: string;
  manifest: string;
  icon: string;
  canonical: string;
  keywords: string;
  author: string;
  viewport: string;
  apple_mobile_web_app_status_bar_style: string;
  apple_mobile_web_app_capable: string;
  mobile_web_app_capable: string;
}

const metaInfo: MetaInfo = basicSettings.meta;

const Meta: React.FC = () => (
  <>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charSet={metaInfo.charSet} />
    <meta name="viewport" content={metaInfo.viewport} />
    <meta
      name="apple-mobile-web-app-status-bar-style"
      content={metaInfo.apple_mobile_web_app_status_bar_style}
    />
    <meta name="apple-mobile-web-app-capable" content={metaInfo.apple_mobile_web_app_capable} />
    <meta name="mobile-web-app-capable" content={metaInfo.mobile_web_app_capable} />
    <meta name="apple-mobile-web-app-title" content={metaInfo.title} />
    <meta name="description" content={metaInfo.description} />
    <meta name="keywords" content={metaInfo.keywords} />
    <meta name="author" content={metaInfo.author} />
    <meta property="og:title" content={metaInfo.title} />
    <meta property="og:description" content={metaInfo.description} />
    <meta property="og:image" content={metaInfo.og_image} />
    <meta property="og:type" content="web" />
    <link rel="manifest" href={metaInfo.manifest} />
    <link rel="icon" href={metaInfo.icon} />
    <link rel="shortcut icon" href={metaInfo.icon} />
    <link rel="canonical" href={metaInfo.canonical || (typeof window !== 'undefined' ? window.location.href : undefined)} />
    <link rel="alternate" hrefLang="en" href={metaInfo.canonical || (typeof window !== 'undefined' ? window.location.href : undefined)} />
    <title>{metaInfo.title}</title>
  </>
);

export default Meta;
