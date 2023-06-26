import { useFormContext } from "react-hook-form";
import { EuiFieldNumber, EuiFieldText, EuiFormRow } from '@elastic/eui';
import clsx from "clsx";
import { ReactElement } from "react";
import GetNestedProperties from "../../../helpers/universal/GetNestedProperties";

interface MyNumberFieldProps {
    Label: string;
    Name: string;
    OnChange?: () => void;
    HelpText?: string;
    Placeholder?: string;
    ClassName?: string;
    ClassNameRow?: string;
    FullWidth?: boolean;
    Readonly?: boolean;
    Icon?: string;
    IsLoading?: boolean;
    Prepend?: ReactElement | ReactElement [] | string;
    Append?: ReactElement | ReactElement [] | string;
};

function MyNumberField(Props: MyNumberFieldProps) {
    const { watch, setValue, formState: { errors }, trigger } = useFormContext();

    return (
        <EuiFormRow label={Props.Label} helpText={Props.HelpText} fullWidth={Props.FullWidth}
            isInvalid={!!GetNestedProperties(errors, Props.Name)} 
            error={GetNestedProperties(errors, Props.Name)?.message?.toString()} 
            className={Props.ClassNameRow}
        >
            <EuiFieldNumber
                value={watch(Props.Name)}
                onChange={(e) => {
                    setValue(Props.Name, parseInt(e.target.value));
                    Props.OnChange && Props.OnChange();
                    trigger(Props.Name);
                }}
                placeholder={Props.Placeholder}
                className={clsx('StandardFont', Props.ClassName)}
                fullWidth={Props.FullWidth}
                isInvalid={!!GetNestedProperties(errors, Props.Name)}
                readOnly={Props.Readonly}
                icon={Props.Icon}
                isLoading={Props.IsLoading}
                prepend={Props.Prepend}
                append={Props.Append}
            />
        </EuiFormRow>
    );
};

export default MyNumberField;