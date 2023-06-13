import { useMutation } from "@tanstack/react-query";
import { ClientError, gql } from "graphql-request";
import ToCamelCase from "../../../../helpers/universal/ToCamelCase";
import IScheduleForm from "../../../types/schedule/IScheduleForm";
import GraphQLClient from "../../../GraphQLClient";
import moment from "moment";

const INSERT_NEW_SCHEDULE_MUTATION = gql`
    mutation insertTutorSchedule($input: TutorScheduleAPIInput!) {
        insertTutorSchedule(entity: $input) {
            id
            tutorId
            timezone
            scheduleStartTime
            scheduleEndTime
            lessonDuration
            avaliableHours {
                item1
                item2
            }
            exceptionDates
            additionDates
        }
    }
`;

const UPDATE_SCHEDULE_MUTATION = gql`
    mutation updateTutorSchedule($input: TutorScheduleInput!) {
        updateTutorSchedule(entity: $input) {
            id
            tutorId
            timezone
            scheduleStartTime
            scheduleEndTime
            lessonDuration
            avaliableHours {
                item1
                item2
            }
            exceptionDates
            additionDates
        }
    }
`;

const UseScheduleMutation = ((OnSuccess?: Function) => {
    return useMutation<IScheduleForm, ClientError, IScheduleForm>(
        ['UpdateUserSchedule'],
        async (UpdatedSchedule: IScheduleForm) => {
            if (moment.isMoment(UpdatedSchedule.ScheduleStartTime) && 
                moment.isMoment(UpdatedSchedule.ScheduleEndTime)) 
            {
                UpdatedSchedule.ScheduleStartTime = UpdatedSchedule.ScheduleStartTime.format('HH:mm');
                UpdatedSchedule.ScheduleEndTime = UpdatedSchedule.ScheduleEndTime.format('HH:mm');
            }

            if (UpdatedSchedule.Id) {
                const Response = await GraphQLClient.request<{ updateTutorSchedule: IScheduleForm }>(
                    UPDATE_SCHEDULE_MUTATION, { input: ToCamelCase(UpdatedSchedule) });
                return Response.updateTutorSchedule as IScheduleForm;
            } else {
                const Response = await GraphQLClient.request<{ insertTutorSchedule: IScheduleForm }>(
                    INSERT_NEW_SCHEDULE_MUTATION, { input: ToCamelCase(UpdatedSchedule, ['Id']) });
                return Response.insertTutorSchedule as IScheduleForm;
            }
        },
        {
            onSuccess: () => {
                OnSuccess && OnSuccess();
            }
        }
    )
});

export default UseScheduleMutation;