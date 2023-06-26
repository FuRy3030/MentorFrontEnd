import { useMutation } from "@tanstack/react-query";
import { ClientError, gql } from "graphql-request";
import ToCamelCase from "../../../../helpers/universal/ToCamelCase";
import IScheduleForm from "../../../types/schedule/IScheduleForm";
import GraphQLClient from "../../../GraphQLClient";
import moment from "moment";

const INSERT_NEW_SCHEDULE_MUTATION = gql`
    mutation InsertTutorSchedule($input: TutorScheduleAPIInput!) {
        InsertTutorSchedule(entity: $input) {
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
    mutation UpdateTutorSchedule($input: TutorScheduleInput!) {
        UpdateTutorSchedule(entity: $input) {
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
                const Response = await GraphQLClient.request<{ UpdateTutorSchedule: IScheduleForm }>(
                    UPDATE_SCHEDULE_MUTATION, { input: ToCamelCase(UpdatedSchedule) });
                return Response.UpdateTutorSchedule as IScheduleForm;
            } else {
                const Response = await GraphQLClient.request<{ InsertTutorSchedule: IScheduleForm }>(
                    INSERT_NEW_SCHEDULE_MUTATION, { input: ToCamelCase(UpdatedSchedule, ['Id']) });
                return Response.InsertTutorSchedule as IScheduleForm;
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