import { Config } from "../../../../../config";
import { useMutation } from "@tanstack/react-query";
import request, { ClientError, gql } from "graphql-request";
import ISendPasswordResetLinkForm from "../../../types/auth/ISendPasswordResetLink";

const SEND_PASSWORD_RESET_LINK_MUTATION = gql`
  mutation sendPasswordRetrievalMail($email: String!) {
    sendPasswordRetrievalMail(email: $email)
  }
`;

const UseSendPasswordResetLink = (() => {
    return useMutation<boolean, ClientError, ISendPasswordResetLinkForm>(
        ['SendPasswordResetLink'],
        async (Credentials: ISendPasswordResetLinkForm) => {
            const Response: any = await request(Config.GraphQLUrl, SEND_PASSWORD_RESET_LINK_MUTATION, 
                { email: Credentials.Email });
            return Response.sendPasswordRetrievalMail as boolean;
        }
    )
});

export default UseSendPasswordResetLink;