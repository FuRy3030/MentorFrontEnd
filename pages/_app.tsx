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

function MyApp({ Component, pageProps, router }: AppProps) {
    // moment.tz.setDefault('Europe/Warsaw');
    const RoutesWithProfileLayout = ['/', '/schedule', '/profile'];
    const RoutesWithListLayout = ['/pricing'];

    // Check if the current route should have the layout
    const ShouldRenderProfileLayout: boolean = RoutesWithProfileLayout.includes(router.route);
    const ShouldRenderListLayout: boolean = RoutesWithListLayout.includes(router.route);

    return (
        <QueryClientProvider client={DefaultQueryClient}>
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
        </QueryClientProvider>
    );
}

export default MyApp;