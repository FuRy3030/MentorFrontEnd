import { EuiDatePicker } from "@elastic/eui";
import moment from "moment";
import { Moment } from "moment";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

interface MyDatePickerProps {
    Label?: string;
    Name: string;
    OnChange?: (Date: Moment) => void;
    HelpText?: string;
    Placeholder?: string;
    ClassName?: string;
    FullWidth?: boolean;
    Inline?: boolean;
    ShowTimeSelect?: boolean;
    Shadow?: boolean;
}

function MyDatePicker(Props: MyDatePickerProps) {
    const [InlineDate, SetInlineDate] = useState<Moment>(moment().tz('Europe/Warsaw'));
    const { watch, setValue, formState: { errors }, trigger } = useFormContext();
    
    if (Props.Inline) {
        return (
            <EuiDatePicker
                selected={InlineDate}
                onChange={(Date: Moment) => {
                    SetInlineDate(Date);
                    Props.OnChange && Props.OnChange(Date);
                }}
                inline
                showTimeSelect={Props.ShowTimeSelect}
                shadow={Props.Shadow}
                fullWidth={Props.FullWidth}
            />
        );
    } else {
        return <></>
    }
};

export default MyDatePicker;