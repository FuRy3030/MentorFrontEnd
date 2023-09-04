import { EuiFilePicker } from "@elastic/eui";
import { useFormContext } from "react-hook-form";
import GetNestedProperties from "../../../helpers/universal/GetNestedProperties";
import clsx from "clsx";

interface MyFilePickerProps {
    Name: string;
    MaxSize: number;
    AllowedFileTypes: string [];
    PromptText: string;
    HelpText?: string;
    Multiple?: boolean;
    Large?: boolean;
    IsLoading?: boolean;
    FullWidth?: boolean;
    ClassName?: string;
}

function MyFilePicker(Props: MyFilePickerProps) {
    const { setValue, setError, clearErrors, trigger, formState: { errors } } = useFormContext();

    return (
        <div className={clsx("flex flex-col", Props.ClassName)}>
            <EuiFilePicker
                multiple={Props.Multiple}
                initialPromptText={Props.PromptText}
                onChange={(Files) => {
                    if (Files) {
                        const FilesArray = Array.from(Files);
                        for (const CurrentFile of FilesArray) {
                            if (CurrentFile.size > Props.MaxSize) {
                                setError(Props.Name, { type: 'manual', message: 'Plik jest za duży!' });
                                return;
                            }
                            else if (!(Props.AllowedFileTypes.includes(CurrentFile.type))) {
                                setError(Props.Name, { type: 'manual', message: 'Plik ma nieprawidłowy format!' });
                                return;
                            }
                        }

                        setValue(Props.Name, FilesArray);
                        trigger(Props.Name);
                        clearErrors(Props.Name);
                    }
                }}
                display={Props.Large ? 'large' : 'default'}
                isInvalid={!!GetNestedProperties(errors, Props.Name)}
                isLoading={Props.IsLoading}
                fullWidth={Props.FullWidth}
            />
            {Props.HelpText && 
                <span style={{ color: '#69707D', fontSize: '0.8571428571rem', lineHeight: '1.1428571429rem' }}
                    className="mt-1 cursor-default font-medium"
                >
                    {Props.HelpText}
                </span>
            }
            {!!GetNestedProperties(errors, Props.Name) && (
                <span className="text-sm font-medium text-red-600 mt-0.5 ml-0.5 cursor-default">
                    {GetNestedProperties(errors, Props.Name)?.message?.toString()}
                </span>
            )}
        </div>
    );
};

export default MyFilePicker;