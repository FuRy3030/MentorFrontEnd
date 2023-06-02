import { EuiCheckbox } from "@elastic/eui";
import clsx from "clsx";
import { useFormContext } from "react-hook-form";

interface MyCheckboxFieldProps {
    Id: string;
    Label: string;
    Name: string;
    ClassName?: string;
};

function MyCheckbox(Props: MyCheckboxFieldProps) {
    const { watch, setValue } = useFormContext();

    return (
        <EuiCheckbox
            checked={watch(Props.Name)} 
            onChange={(e) => setValue(Props.Name, e.target.checked)}
            id={Props.Id}
            label={Props.Label}
            className={clsx('my-4', Props.ClassName)}
        />
    );
};

export default MyCheckbox;