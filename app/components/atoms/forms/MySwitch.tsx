import { EuiSwitch } from "@elastic/eui";
import clsx from "clsx";
import { useFormContext } from "react-hook-form";

interface MySwitchProps {
    Label: string;
    Name: string;
    OnChange?: () => void;
    Compressed?: boolean;
    ClassName?: string;
}

function MySwitch(Props: MySwitchProps) {
    const { watch, setValue, trigger } = useFormContext();
    
    return (
        <EuiSwitch
            checked={watch(Props.Name)} 
            onChange={(e) => {
                setValue(Props.Name, e.target.checked);
                trigger(Props.Name);
            }}
            label={Props.Label}
            className={clsx('my-4', Props.ClassName)}
            compressed={Props.Compressed}
        />
    );
};

export default MySwitch;