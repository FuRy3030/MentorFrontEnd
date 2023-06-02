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
    const { watch, setValue } = useFormContext();

    return (
        <EuiFormRow label={Props.Label} helpText={Props.HelpText} fullWidth={Props.FullWidth}>
            <EuiFieldPassword
                value={watch(Props.Name)}
                onChange={(e) => setValue(Props.Name, e.currentTarget.value)}
                placeholder={Props.Placeholder}
                type="dual"
                className={clsx('StandardFont', Props.ClassName)}
                fullWidth={Props.FullWidth}
            />
        </EuiFormRow>
    );
};

export default MyPasswordField;