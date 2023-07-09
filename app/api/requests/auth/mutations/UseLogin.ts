import { Config } from "../../../../../config";
import { useMutation } from "@tanstack/react-query";
import request, { ClientError, gql } from "graphql-request";
import ILoginForm from "../../../types/auth/ILoginForm";
import { SetAuthHeader } from "../../../GraphQLClient";
import { useRouter } from "next/router";
import AuthState from "../../../../store/auth/AuthState";

const AUTHENTICATE_USER_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

const UseLogin = (() => {
    const Router = useRouter();

    return useMutation<string, ClientError, ILoginForm>(
        ['AuthenticateUser'],
        async (Credentials: ILoginForm) => {
            const Response: any = await request(Config.GraphQLUrl, AUTHENTICATE_USER_MUTATION, 
                { email: Credentials.Email, password: Credentials.Password });
            return Response.login as string;
        },
        {
            onSuccess: (Token: string) => {
                const ExpirationDate = new Date();
                ExpirationDate.setHours(ExpirationDate.getHours() + 12);
                localStorage.setItem('session', Token);
                localStorage.setItem('expiration', ExpirationDate.toISOString());
                SetAuthHeader(Token);

                AuthState.IsLogged = true;
                setTimeout(() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('expiration');
                    AuthState.IsLogged = false;
                    Router.push("/auth/login");
                }, 43200000);

                Router.push('/');
            }
        }
    )
});

export default UseLogin;