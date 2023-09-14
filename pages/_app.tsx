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