import { AppProps } from 'next/app';
import '../styles/global.scss';
import '@elastic/eui/dist/eui_theme_light.css';

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export default MyApp;