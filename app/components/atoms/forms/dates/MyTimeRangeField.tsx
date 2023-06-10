import { EuiDatePickerRange, EuiFormRow } from "@elastic/eui";
import clsx from "clsx";
import moment from "moment";
import { Moment } from "moment";
import dynamic from "next/dynamic";
import { useFormContext } from "react-hook-form";

interface MyTimeRangeFieldProps {
    Label: string;
    Name: [string, string];
    OnChange?: [() => void, () => void];
    HelpText?: string;
    Placeholder?: string;
    ClassName?: string;
    FullWidth?: boolean;
};

function MyTimeRangeField(Props: MyTimeRangeFieldProps) {
    const { watch, setValue, formState: { errors }, trigger } = useFormContext();
    const EuiDatePicker: any = dynamic(() => import('@elastic/eui').then(module => module.EuiDatePicker), 
        {ssr: true});
    let ErrorMessage: string | undefined = '';    

    if (!!errors[Props.Name[0]] && !!errors[Props.Name[1]]) {
        ErrorMessage = errors[Props.Name[0]]?.message?.toString() + ' ' + errors[Props.Name[1]]?.message?.toString();
    } else if (!!errors[Props.Name[0]]) {
        ErrorMessage = errors[Props.Name[0]]?.message?.toString();
    } else {
        ErrorMessage = errors[Props.Name[1]]?.message?.toString();
    }
    
    return (
        <EuiFormRow label={Props.Label} helpText={Props.HelpText} fullWidth={Props.FullWidth}
            isInvalid={!!errors[Props.Name[0]] || !!errors[Props.Name[1]]} 
            error={ErrorMessage}
        >
            <EuiDatePickerRange
                fullWidth={Props.FullWidth}
                isInvalid={!!errors[Props.Name[0]] || !!errors[Props.Name[1]]}
                startDateControl={
                    <EuiDatePicker
                        showTimeSelect
                        showTimeSelectOnly
                        selected={watch(Props.Name[0])}
                        onChange={(Date: Moment) => {
                            if (Date.tz() === 'Europe/Warsaw') setValue(Props.Name[0], Date);
                            else setValue(Props.Name[0], moment.tz(Date, 'Europe/Warsaw'));
                            trigger(Props.Name[0]);
                            Props.OnChange && Props.OnChange[0]();
                        }}
                        dateFormat="HH:mm"
                        timeFormat="HH:mm"
                        placeholder={Props.Placeholder}
                        className={clsx('StandardFont', Props.ClassName)}
                        fullWidth={Props.FullWidth}
                        isInvalid={!!errors[Props.Name[0]]}
                    />
                }
                endDateControl={
                    <EuiDatePicker
                        showTimeSelect
                        showTimeSelectOnly
                        selected={watch(Props.Name[1])}
                        onChange={(Date: Moment) => {
                            if (Date.tz() === 'Europe/Warsaw') setValue(Props.Name[1], Date);
                            else setValue(Props.Name[1], moment.tz(Date, 'Europe/Warsaw'));
                            trigger(Props.Name[1]);
                            Props.OnChange && Props.OnChange[1]();
                        }}
                        dateFormat="HH:mm"
                        timeFormat="HH:mm"
                        placeholder={Props.Placeholder}
                        className={clsx('StandardFont', Props.ClassName)}
                        fullWidth={Props.FullWidth}
                        isInvalid={!!errors[Props.Name[1]]}
                    />
                }
            />
        </EuiFormRow>
    );
};

export default MyTimeRangeField;