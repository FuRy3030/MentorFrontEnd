import { useFormContext } from "react-hook-form";
import { EuiComboBox, EuiComboBoxOptionOption, EuiFormRow } from '@elastic/eui';
import clsx from "clsx";
import { ReactElement, useState } from "react";

interface MyMultiSelectFieldProps<T> {
    Label: string;
    Name: string;
    Options: EuiComboBoxOptionOption<T>[];
    DefaultSelectedOptions?: EuiComboBoxOptionOption<T>[];
    OnChange: (Options: EuiComboBoxOptionOption<T>[]) => void;
    HelpText?: string;
    Placeholder?: string;
    ClassName?: string;
    ClassNameRow?: string;
    FullWidth?: boolean;
    IsLoading?: boolean;
    Prepend?: ReactElement | ReactElement [];
    Append?: ReactElement | ReactElement [];
};

function MyMultiSelectField<T>(Props: MyMultiSelectFieldProps<T>) {
    const { formState: { errors }, trigger } = useFormContext();
    const [ SelectedOptions, SetSelectedOptions ] = useState<EuiComboBoxOptionOption<T> []>
        (Props.DefaultSelectedOptions || []);

    return (
        <EuiFormRow label={Props.Label} helpText={Props.HelpText} fullWidth={Props.FullWidth}
            isInvalid={!!errors[Props.Name]} error={errors[Props.Name]?.message?.toString()} className={Props.ClassNameRow}
        >
            <EuiComboBox
                options={Props.Options}
                selectedOptions={SelectedOptions}
                onChange={(Options) => {
                    SetSelectedOptions(Options);
                    Props.OnChange && Props.OnChange(Options);
                    trigger(Props.Name);
                }}
                placeholder={Props.Placeholder}
                className={clsx('StandardFont', Props.ClassName)}
                fullWidth={Props.FullWidth}
                isInvalid={!!errors[Props.Name]}
                isLoading={Props.IsLoading}
                prepend={Props.Prepend}
                append={Props.Append}
            />
        </EuiFormRow>
    );
};

export default MyMultiSelectField;