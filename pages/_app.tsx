import { AppProps } from 'next/app';
import '../styles/global.scss';
import '../styles/custom.scss';
import '@elastic/eui/dist/eui_theme_light.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import DefaultQueryClient from '../app/api/DefaultQueryClient';
import ProfileLayout from '../layouts/ProfileLayout';
import moment from 'moment';
import 'moment-timezone';
import ListItemsLayout from '../layouts/ListItemsLayout';
import AuthorizeProvider from '../app/providers/AuthorizeProvider';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import Head from 'next/head';

function MyApp({ Component, pageProps, router }: AppProps) {
    // moment.tz.setDefault('Europe/Warsaw');
    const RoutesWithProfileLayout = ['/', '/schedule', '/profile'];
    const RoutesWithListLayout = ['/pricing', '/payments', '/meetings', '/verify/stripe'];

    // Check if the current route should have the layout
    const ShouldRenderProfileLayout: boolean = RoutesWithProfileLayout.includes(router.route);
    const ShouldRenderListLayout: boolean = RoutesWithListLayout.includes(router.route);

    return (
        <QueryClientProvider client={DefaultQueryClient}>
            <GoogleReCaptchaProvider
                reCaptchaKey="6LeIniMoAAAAAJKIkrpaYkDGPZpDfUGpZnnvvk1H"
                language="pl"
                scriptProps={{
                    async: false, 
                    defer: false, 
                    appendTo: 'head', 
                    nonce: undefined
                }}
            >
                <AuthorizeProvider>
                    <Head>
                        <title>Competify - Razem z nami zawalczysz o najwyższe wyniki!</title>
                        <meta name="description" content="W Competify zajmujemy się kompleksowym przygotowaniem do olimpiad: łączymy ambitnych uczniów szkół średnich z laureatami najwyższych lokat, którzy dokładnie wiedzą, co trzeba zrobić, aby wygrać olimpiadę" />
                        <meta property="og:title" content="Competify - Razem z nami zawalczysz o najwyższe wyniki!" />
                        <meta property="og:description" content="W Competify zajmujemy się kompleksowym przygotowaniem do olimpiad: łączymy ambitnych uczniów szkół średnich z laureatami najwyższych lokat, którzy dokładnie wiedzą, co trzeba zrobić, aby wygrać olimpiadę" />
                        <meta property="og:image" content="/website-previews/website-preview.png" />
                        <meta property="og:url" content="https://mentor-front-end.vercel.app" />
                        <meta property="og:type" content="website" />
                        <link rel="icon" href="/logo/favicon.ico" />
                    </Head>
                    {ShouldRenderProfileLayout ? 
                        <ProfileLayout>
                            <Component {...pageProps} />
                        </ProfileLayout>
                        :
                        ShouldRenderListLayout ?
                        <ListItemsLayout>
                            <Component {...pageProps} />
                        </ListItemsLayout>
                        :
                        <Component {...pageProps} />
                    }
                </AuthorizeProvider>
            </GoogleReCaptchaProvider>
        </QueryClientProvider>
    );
}

export default MyApp;