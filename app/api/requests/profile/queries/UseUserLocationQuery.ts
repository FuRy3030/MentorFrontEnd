import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import GeoLocationResponse from "../../../types/external/GeoLocationResponse";

const UseLocationQuery = ((City: string, Country: string) => {
    return useQuery<AxiosResponse<GeoLocationResponse []>, AxiosError, AxiosResponse<GeoLocationResponse []>>(
        ['LocationQuery'],
        async () => {
            const Response = await axios.get<GeoLocationResponse []>('https://nominatim.openstreetmap.org/search', { 
                params: { city: City, country: Country, format: 'json' } 
            });
            return Response;
        }
    );
});

export default UseLocationQuery;