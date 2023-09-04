import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ClientError, gql } from "graphql-request";
import GraphQLClient from "../../../GraphQLClient";
import { useRouter } from "next/router";

const STRIPE_VERIFY_MUTATION = gql`
  	mutation {
		UpdateAccountVerificationStatus
  	}
`;

const UseStripeVerifyMutation = ((OnSuccess?: Function) => {
    const QueryClient = useQueryClient();
    const Router = useRouter();
    
    return useMutation<void, ClientError, void>(
    	['StripeVerify'],
        async () => {
            const Response: any = await GraphQLClient.request(STRIPE_VERIFY_MUTATION);

            if (Response.UpdateAccountVerificationStatus) {
                QueryClient.invalidateQueries(['Me']);
            }

            Router.push('/pricing');
			return;
        },
        {
            onSuccess: () => {
                OnSuccess && OnSuccess();
            }
        }
    )
});

export default UseStripeVerifyMutation;