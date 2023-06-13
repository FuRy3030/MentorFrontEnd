import { AppProps } from 'next/app';
import '../styles/global.scss';
import '@elastic/eui/dist/eui_theme_light.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import DefaultQueryClient from '../app/api/DefaultQueryClient';
import ProfileLayout from '../layouts/ProfileLayout';
import moment from 'moment';
import 'moment-timezone';

function MyApp({ Component, pageProps, router }: AppProps) {
    // moment.tz.setDefault('Europe/Warsaw');
    const RoutesWithoutLayout = ['/', '/schedule', '/profile'];

    // Check if the current route should have the layout
    const ShouldRenderLayout: boolean = RoutesWithoutLayout.includes(router.route);

    return (
        <QueryClientProvider client={DefaultQueryClient}>
            {ShouldRenderLayout ? 
                <ProfileLayout>
                    <Component {...pageProps} />
                </ProfileLayout>
                :
                <Component {...pageProps} />
            }
        </QueryClientProvider>
    );
}

export default MyApp;