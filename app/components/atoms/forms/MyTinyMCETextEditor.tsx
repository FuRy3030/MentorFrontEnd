import { Editor } from "@tinymce/tinymce-react";
import { useFormContext } from "react-hook-form";

interface MyTinyMCETextEditorProps {
    Label: string;
    Name: string;
    InitialValue: string;
};

function MyTinyMCETextEditor(Props: MyTinyMCETextEditorProps) {
    const { setValue, trigger } = useFormContext();

    return (
        <Editor
            apiKey="8zeiecumaelmsn2e2gol1z7j4i2fabagjk94fywrs8dnqz49"
            initialValue={Props.InitialValue}
            init={{
                height: 400,
                menubar: true,
                statusbar: true,
                font_formats: 'Arial Black=arial black,avant garde;Gugi=Gugi, cursive;Times New Roman=times new roman,times;',
                plugins: [
                    'autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount',
                ],
                toolbar:
                    'undo redo | formatselect | ' +
                    'bold italic backcolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
            }}
            onChange={(Editor: any) => {
                setValue(Props.Name, Editor.level.content);
                trigger(Props.Name);
            }}
        />
    );
};

export default MyTinyMCETextEditor;