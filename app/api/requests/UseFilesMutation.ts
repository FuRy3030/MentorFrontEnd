import axios, { AxiosError, AxiosResponse } from "axios";
import { useMutation } from "@tanstack/react-query";
import { Config } from "../../../config";

const UseFilesMutation = ((FileIdentifier: string, Prefix: string, OnSuccess?: Function) => {
    return useMutation<AxiosResponse<string>, AxiosError, File []>(
        ['FilesMutation', FileIdentifier, Prefix],
        async (Files: File []) => {
            const FilesFormData = new FormData();
            for (let i = 0; i < Files.length; i++) {
                FilesFormData.append(i.toString(), Files[i]);
            }

            const Response = await axios.post<string>(Config.FilesUrl, FilesFormData, { 
                params: { FileIdentifier: FileIdentifier, Prefix: Prefix },
                headers: { Authorization: `Bearer ${localStorage.getItem('session')}` } 
            });
            return Response;
        },
        {
            onSuccess: () => {
                OnSuccess && OnSuccess();
            }
        }
    );
});

export default UseFilesMutation;