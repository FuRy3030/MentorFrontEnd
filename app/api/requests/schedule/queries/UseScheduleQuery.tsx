import { useQuery } from "@tanstack/react-query";
import IScheduleForm from "../../../types/schedule/IScheduleForm";
import { ClientError, gql } from "graphql-request";
import GraphQLClient from "../../../GraphQLClient";
import ToUpperCase from "../../../../helpers/universal/ToUpperCase";

const GET_USER_SCHEDULE_QUERY = gql`
    query {
        tutorScheduleByUser {
            id
            userId
            timezone
            lessonDuration
            scheduleStartTime
            scheduleEndTime
            avaliableHours {
                item1
                item2
            }
            exceptionDates
        }
    }
`;

const UseScheduleQuery = (() => {
    return useQuery<IScheduleForm, ClientError, IScheduleForm>(
        ['UserSchedule'],
        async () => {
            const Response = await GraphQLClient.request<{ tutorScheduleByUser: IScheduleForm }>
                (GET_USER_SCHEDULE_QUERY);
            return ToUpperCase(Response.tutorScheduleByUser) as IScheduleForm;
        }
    );
});

export default UseScheduleQuery;