import { Config } from "../../../../../config";
import { useMutation } from "@tanstack/react-query";
import request, { ClientError, gql } from "graphql-request";
import IRegisterForm from "../../../types/auth/IRegisterForm";
import ToCamelCase from "../../../../helpers/universal/ToCamelCase";

const ADD_USER_MUTATION = gql`
  mutation addUser($input: MentorAPIInput!) {
    addUser(newUser: $input)
  }
`;

const UseRegister = (() => {
    return useMutation<boolean, ClientError, IRegisterForm>(
        ['RegisterNewUser'],
        async (NewUser: IRegisterForm) => {
            const Response: any = await request(Config.GraphQLUrl, ADD_USER_MUTATION, 
                { input: ToCamelCase(NewUser, ['PolicyConsent']) });
            return Response.addUser as boolean;
        }
    )
});

export default UseRegister;