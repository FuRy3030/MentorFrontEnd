import { useQuery } from "@tanstack/react-query";
import { ClientError, gql } from "graphql-request";
import GraphQLClient from "../../../GraphQLClient";
import ToUpperCase from "../../../../helpers/universal/ToUpperCase";
import IMe from "../../../types/auth/IMe";

const GET_ME_DATA = gql`
    query {
        Me {
            firstName
            lastName
            isVerified
            stripeAccountId
            isStripeVerified
        }
    }
`;

const UseMe = (() => {
    return useQuery<IMe, ClientError, IMe>(
        ['Me'],
        async () => {
            const Response = await GraphQLClient.request<{ Me: IMe }>
                (GET_ME_DATA);
            return ToUpperCase(Response.Me) as IMe;
        }
    );
});

export default UseMe;