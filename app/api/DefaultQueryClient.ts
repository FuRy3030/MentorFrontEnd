import { QueryCache, QueryClient } from "@tanstack/react-query";

const DefaultQueryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry:                false,
            refetchOnWindowFocus: false,
            staleTime:            20_000
        },
    },
    queryCache: new QueryCache({
        onError(err: any, query) {
            if (!query.meta?.ignore401 && err.response?.status == 401) {
                DefaultQueryClient.removeQueries();
                // redirect to login
            }
            else if (err.response?.status == 500) {
                // error
            }
        },
    }),
});
  
export default DefaultQueryClient;