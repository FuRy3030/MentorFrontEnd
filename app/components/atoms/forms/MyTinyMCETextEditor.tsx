import { Editor } from "@tinymce/tinymce-react";
import { useFormContext } from "react-hook-form";
import GetNestedProperties from "../../../helpers/universal/GetNestedProperties";

interface MyTinyMCETextEditorProps {
    Label: string;
    Name: string;
    InitialValue: string;
};

const ExtractTextFromHtml = (HTML: string): string => {
    const Container = document.createElement('div');
    Container.innerHTML = HTML;
    return Container.textContent || Container.innerText || '';
};

function MyTinyMCETextEditor(Props: MyTinyMCETextEditorProps) {
    const { setValue, trigger, formState: { errors } } = useFormContext();

    return (
        <>
            <label className="inline-block font-semibold mb-1.5 ml-0.5" 
                style={{ color: '#1a1c21', fontSize: '0.8571428571rem', lineHeight: '1.1428571429rem' }}
            >
                {Props.Label}
            </label>
            <Editor
                apiKey="8zeiecumaelmsn2e2gol1z7j4i2fabagjk94fywrs8dnqz49"
                initialValue={Props.InitialValue}
                init={{
                    height: 400,
                    menubar: true,
                    statusbar: true,
                    content_style: `@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap'); body { font-family:Quicksand,sans-serif; font-size:14px; font-weight:500; }`,
                    font_size_formats: '8pt 9pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt',
                    font_family_formats: 'Quicksand=Quicksand,sans-serif',
                    plugins: [
                        'autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount',
                    ],
                    toolbar:
                        'undo redo | formatselect | ' +
                        'bold italic backcolor | fontsize | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                }}
                onChange={(Editor: any) => {
                    const TextContent: string = ExtractTextFromHtml(Editor.level.content);
                    if (TextContent === '' || TextContent === undefined) setValue(Props.Name, '');
                    else setValue(Props.Name, Editor.level.content)
                    trigger(Props.Name);
                }}
            />
            {!!GetNestedProperties(errors, Props.Name) && (
                <span className="text-sm text-semibold text-red-600 mt-2.5 ml-0.5 cursor-default">
                    {GetNestedProperties(errors, Props.Name)?.message?.toString()}
                </span>
            )}
        </>
    );
};

export default MyTinyMCETextEditor;
export const ExtractRawTextFromHtml = ExtractTextFromHtml;