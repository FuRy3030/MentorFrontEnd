import axios, { AxiosError, AxiosResponse } from "axios";
import { FileData } from "../types/FileData";
import { useQuery } from "@tanstack/react-query";
import { Config } from "../../../config";

const UseFilesQuery = ((FileIdentifier: string, Prefix: string) => {
    return useQuery<Blob [], AxiosError, Blob []>(
        ['FilesQuery', FileIdentifier, Prefix],
        async () => {
            const FileBlobs: Blob [] = [];
            const Response = await axios.get<FileData []>(Config.FilesUrl, { 
                params: { FileIdentifier: FileIdentifier, Prefix: Prefix } 
            });

            Response.data.forEach((FileData: FileData)  => {
                const { fileBytes } = FileData;

                const ByteCharacters = atob(fileBytes);
                const ByteNumbers = new Array(ByteCharacters.length);
                for (let i = 0; i < ByteCharacters.length; i++) {
                    ByteNumbers[i] = ByteCharacters.charCodeAt(i);
                }
                const ByteArray = new Uint8Array(ByteNumbers);
          
                // Create a Blob object from the fileBytes
                FileBlobs.push(new Blob([ByteArray], { type: 'image/jpeg' }));
            });
            return FileBlobs;
        }
    );
});

export default UseFilesQuery;