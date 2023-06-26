import { useMutation } from "@tanstack/react-query";
import { ClientError, gql } from "graphql-request";
import { ToCamelCaseArray } from "../../../../helpers/universal/ToCamelCase";
import GraphQLClient from "../../../GraphQLClient";
import IPricingForm from "../../../types/pricing/IPricingForm";

const REPLACE_PRICING_MODULES_MUTATION = gql`
    mutation ReplaceAllPricingsForTutor($input: [TutorPricingAPIInput!]!) {
        ReplaceAllPricingsForTutor(entities: $input) {
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

const UsePricingMutation = ((OnSuccess?: Function) => {
    return useMutation<IPricingForm [], ClientError, IPricingForm []>(
        ['UpdateUserPricingModules'],
        async (NewPricingModules: IPricingForm []) => {
            const Response = await GraphQLClient.request<{ ReplaceAllPricingsForTutor: IPricingForm [] }>(
                REPLACE_PRICING_MODULES_MUTATION, { input: ToCamelCaseArray(NewPricingModules, ['Id']) });
            return Response.ReplaceAllPricingsForTutor as IPricingForm [];
        },
        {
            onSuccess: () => {
                OnSuccess && OnSuccess();
            }
        }
    )
});

export default UsePricingMutation;