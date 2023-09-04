import { useMutation } from "@tanstack/react-query";
import { ClientError, gql } from "graphql-request";
import GraphQLClient from "../../../GraphQLClient";
import { useRouter } from "next/router";

const ONBOARDING_LINK_MUTATION = gql`
  	mutation {
		GetOnboardingLink
  	}
`;

const UseOnboardingLinkMutation = (() => {
	const Router = useRouter();

    return useMutation<void, ClientError, void>(
    	['StripeOnboardingLink'],
        async () => {
            const Response: any = await GraphQLClient.request(ONBOARDING_LINK_MUTATION);
			Router.push(Response.GetOnboardingLink);
			return;
        }
    )
});

export default UseOnboardingLinkMutation;