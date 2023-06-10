import { useFormContext } from "react-hook-form";
import { EuiFieldPassword, EuiFormRow } from '@elastic/eui';
import clsx from "clsx";

interface MyPasswordFieldProps {
    Label: string;
    Name: string;
    HelpText?: string;
    Placeholder?: string;
    ClassName?: string;
    FullWidth?: boolean;
};

function MyPasswordField(Props: MyPasswordFieldProps) {
    const { watch, setValue, formState: { errors }, trigger } = useFormContext();

    return (
        <EuiFormRow label={Props.Label} helpText={Props.HelpText} fullWidth={Props.FullWidth}
            isInvalid={!!errors[Props.Name]} error={errors[Props.Name]?.message?.toString()}
        >
            <EuiFieldPassword
                value={watch(Props.Name)}
                onChange={(e) => {
                    setValue(Props.Name, e.target.value);
                    trigger(Props.Name);
                }}
                placeholder={Props.Placeholder}
                type="dual"
                className={clsx('StandardFont', Props.ClassName)}
                fullWidth={Props.FullWidth}
                isInvalid={!!errors[Props.Name]}
            />
        </EuiFormRow>
    );
};

export default MyPasswordField;