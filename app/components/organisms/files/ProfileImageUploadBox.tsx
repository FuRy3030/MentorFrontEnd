import { FormProvider, useForm } from "react-hook-form";
import MyFilePicker from "../../atoms/forms/MyFilePicker";
import MyStandardButton from "../../atoms/buttons/MyStandardButton";
import AvatarWithRings from "../../atoms/avatars/AvatarWithRings";
import UseFilesMutation from "../../../api/requests/UseFilesMutation";
import UseFilesQuery from "../../../api/requests/UseFilesQuery";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import SuccessErrorToastsPair from "../../modals/toasts/SuccessErrorToastsPair";

function ProfileImageUploadBox() {
    const QueryClient = useQueryClient();
    const Methods = useForm<{ ProfileImage: File[] }>();
    const FilesQuery = UseFilesQuery('Tutor', 'ProfileImage');
    const { mutate, isSuccess, isError, isLoading } = UseFilesMutation('Tutor', 'ProfileImage', () => {
        QueryClient.invalidateQueries(['FilesQuery', 'Tutor', 'ProfileImage']);
    });

    const [ProfileBlobURL, SetProfileBlobURL] = useState<string>('/flaticons/user.png');

    useEffect(() => {
        if (FilesQuery.data && FilesQuery.data[0]) {
            const BlobURL = URL.createObjectURL(FilesQuery.data[0]);
            SetProfileBlobURL(BlobURL);

            // Clean up the blob URL when the component unmounts or when the blob URL changes
            return () => {
                URL.revokeObjectURL(BlobURL);
            };
        }
    }, [FilesQuery.data]);

    return (
        <FormProvider {...Methods}>
            <form className="flex flex-col mb-10 mx-auto max-w-[700px]" onSubmit={Methods.handleSubmit((FormData) => (mutate(FormData.ProfileImage)))}>
                <h2 className="text-2xl font-bold text-dark mb-6">Dodaj swoje zdjęcie</h2>
                <div className="w-full flex flex-row justify-between items-center flex-wrap">
                    <AvatarWithRings 
                        Width={130}
                        Height={130}
                        Src={ProfileBlobURL}
                        ClassName="w-full mb-6 mx-auto md:w-[35%] md:mb-0 md:mr-auto md:ml-0"                       
                    />
                    <MyFilePicker
                        AllowedFileTypes={["image/jpeg", "image/png"]}
                        MaxSize={30 * 1024}
                        Name="ProfileImage"
                        PromptText="Wybierz zdjęcie"
                        ClassName="w-full md:w-[60%]"
                        HelpText="Twoje zdjęcie profilowe nie może być większe niż 30KB. Jego format to JPEG lub PNG."
                        IsLoading={isLoading || FilesQuery.isLoading}
                        Large
                        FullWidth
                    />
                </div>
                <MyStandardButton Type="submit" Text="Zapisz zdjęcie profilowe" onClick={() => {}} 
                    Icon="icon-[material-symbols--add-photo-alternate-outline-rounded]" 
                    ClassName="mt-5 bg-brand-purple-light hover:text-dark px-8 mx-auto md:px-20 md:ml-auto md:mr-0 w-auto" 
                />
            </form>
            <SuccessErrorToastsPair 
                SuccessTitle="Zdjęcie zostało zaaktualizowane"
                ErrorTitle="Zapisywanie twojego zdjęcia nie powiodło się"
                IsSuccessToastTriggered={isSuccess}
                IsErrorToastTriggered={isError}
                SuccessContent={
                    <p className="text-base font-medium">
                        Twoje nowe zdjęcie profilowe zostało pomyślnie zaaktualizowane. W ciągu kilku minut uczniowie będą mogli zobaczyć twoje nowe zdjęcie.
                    </p>
                }
                ErrorContent={
                    <p className="text-base font-medium">
                        Niestety nie udało nam się zapisać twojego nowego zdjęcia profilowego. Spróbuj ponownie później. W przypadku utrzymywania się błędu, skontaktuj się z nami.
                    </p>
                }
            />
        </FormProvider>
    );
};

export default ProfileImageUploadBox;