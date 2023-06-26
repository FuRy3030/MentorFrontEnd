import { useMutation } from "@tanstack/react-query";
import { ClientError, gql } from "graphql-request";
import ToCamelCase from "../../../../helpers/universal/ToCamelCase";
import GraphQLClient from "../../../GraphQLClient";
import IProfileForm from "../../../types/profile/IProfileForm";

const INSERT_NEW_PROFILE_DETAILS_MUTATION = gql`
    mutation InsertTutorDetails($input: TutorDetailsAPIInput!) {
        InsertTutorDetails(entity: $input) {
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

const UPDATE_PROFILE_DETAILS_MUTATION = gql`
    mutation UpdateTutorDetails($input: TutorDetailsInput!) {
        UpdateTutorDetails(entity: $input) {
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

const UseProfileMutation = ((OnSuccess?: Function) => {
    return useMutation<IProfileForm, ClientError, IProfileForm>(
        ['UpdateUserProfile'],
        async (UpdatedProfile: IProfileForm) => {
            if (UpdatedProfile.Id) {
                const Response = await GraphQLClient.request<{ UpdateTutorDetails: IProfileForm }>(
                    UPDATE_PROFILE_DETAILS_MUTATION, { input: ToCamelCase(UpdatedProfile) });
                return Response.UpdateTutorDetails as IProfileForm;
            } else {
                const Response = await GraphQLClient.request<{ InsertTutorDetails: IProfileForm }>(
                    INSERT_NEW_PROFILE_DETAILS_MUTATION, { input: ToCamelCase(UpdatedProfile, ['Id']) });
                return Response.InsertTutorDetails as IProfileForm;
            }
        },
        {
            onSuccess: () => {
                OnSuccess && OnSuccess();
            }
        }
    )
});

export default UseProfileMutation;