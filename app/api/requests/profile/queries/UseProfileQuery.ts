import { useQuery } from "@tanstack/react-query";
import { ClientError, gql } from "graphql-request";
import GraphQLClient from "../../../GraphQLClient";
import ToUpperCase from "../../../../helpers/universal/ToUpperCase";
import IProfileForm from "../../../types/profile/IProfileForm";

const GET_USER_DETAILS_QUERY = gql`
    query {
        tutorDetailsByUser {
            id
            tutorId
            geoLocation {
                latitude
                longitude
            }
            city
            country
            fullLocation
            isRemote
            isStationary
            description
            education
            olympiads {
                experience
                name
            }
        }
    }
`;

const UseProfileQuery = (() => {
    return useQuery<IProfileForm, ClientError, IProfileForm>(
        ['UserProfile'],
        async () => {
            const Response = await GraphQLClient.request<{ tutorDetailsByUser: IProfileForm }>
                (GET_USER_DETAILS_QUERY);
            return ToUpperCase(Response.tutorDetailsByUser) as IProfileForm;
        }
    );
});

export default UseProfileQuery;