import { Config } from "../../../../../config";
import { useMutation } from "@tanstack/react-query";
import request, { ClientError, gql } from "graphql-request";
import INewPasswordForm from "../../../types/auth/INewPasswordForm";

const NEW_PASSWORD_MUTATION = gql`
  mutation resetPassword($token: String!, $newPassword: String!) {
    resetPassword(token: $token, newPassword: $newPassword)
  }
`;

const UseNewPassword = (() => {
    return useMutation<void, ClientError, INewPasswordForm>(
        ['NewPassword'],
        async (NewPassword: INewPasswordForm) => {
            const Response: any = await request(Config.GraphQLUrl, NEW_PASSWORD_MUTATION, 
                { token: NewPassword.Token, newPassword: NewPassword.Password });
        }
    )
});

export default UseNewPassword;