import { useQuery } from "@tanstack/react-query";
import { ClientError, gql } from "graphql-request";
import GraphQLClient from "../../../GraphQLClient";
import IPricingForm from "../../../types/pricing/IPricingForm";
import { ToUpperCaseArray } from "../../../../helpers/universal/ToUpperCase";

const GET_USER_PRICING_QUERY = gql`
    query {
        GetAllTutorPricingsForUserNoPaging {
            id
            tutorId
            name
            basePrice
            doublePackagePrice
            triplePackagePrice
            fivePackagePrice
            tenPackagePrice
            isDoublePackagePriceActive
            isTriplePackagePriceActive
            isFivePackagePriceActive
            isTenPackagePriceActive
        }
    }
`;

const UsePricingQuery = (() => {
    return useQuery<IPricingForm [], ClientError, IPricingForm []>(
        ['UserPricingModules'],
        async () => {
            const Response = await GraphQLClient.request<{ GetAllTutorPricingsForUserNoPaging: IPricingForm [] }>
                (GET_USER_PRICING_QUERY);
            return ToUpperCaseArray(Response.GetAllTutorPricingsForUserNoPaging) as IPricingForm [];
        }
    );
});

export default UsePricingQuery;