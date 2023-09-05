import { useQuery } from "@tanstack/react-query";
import { ClientError, gql } from "graphql-request";
import GraphQLClient from "../../../GraphQLClient";
import { ToUpperCaseArray } from "../../../../helpers/universal/ToUpperCase";
import IMeeting from "../../../types/meetings/IMeeting";

const GET_MEETINGS_QUERY = gql`
    query {
        GetAllTutorMeetingsForUserNoPaging {
            id
            studentName
            educationalServiceName
            date
            isPaid
        }
    }
`;

const UseMeetingsQuery = (() => {
    return useQuery<IMeeting [], ClientError, IMeeting []>(
        ['UserMeetings'],
        async () => {
            const Response = await GraphQLClient.request<{ GetAllTutorMeetingsForUserNoPaging: IMeeting [] }>
                (GET_MEETINGS_QUERY);
            return ToUpperCaseArray(Response.GetAllTutorMeetingsForUserNoPaging) as IMeeting [];
        }
    );
});

export default UseMeetingsQuery;