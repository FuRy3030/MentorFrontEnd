import MyTextField from "../../atoms/forms/MyTextField";
import MyStandardButton from "../../atoms/buttons/MyStandardButton";
import MyFormProvider from "../../../providers/MyFormProvider";
import IProfileForm, { IProfileFormResolver } from "../../../api/types/profile/IProfileForm";
import UseUserClaims from "../../../hooks/auth/UseUserClaims";
import MySelectField from "../../atoms/forms/MySelectField";
import { EuiButtonEmpty, EuiComboBoxOptionOption, EuiFlexItem, EuiIcon } from "@elastic/eui";
import UseLocationQuery from "../../../api/requests/profile/queries/UseUserLocationQuery";
import { useFormContext } from "react-hook-form";
import MyMultiSelectField from "../../atoms/forms/MyMultiSelectField";
import UseOlympiadsLabelValuePair from "../../../hooks/constants/UseOlympiadsLabelValuePair";
import MySwitch from "../../atoms/forms/MySwitch";
import MyTinyMCETextEditor from "../../atoms/forms/MyTinyMCETextEditor";
import SuccessErrorToastsPair from "../../modals/toasts/SuccessErrorToastsPair";
import { useQueryClient } from "@tanstack/react-query";
import UseProfileMutation from "../../../api/requests/profile/mutations/UseProfileMutation";
import UseProfileQuery from "../../../api/requests/profile/queries/UseProfileQuery";

function ProfileForm() {
    const QueryClient = useQueryClient();
    const ProfileQuery = UseProfileQuery();
    const { mutate, isSuccess, isError } = UseProfileMutation(() => {
        QueryClient.invalidateQueries(["UserProfile"]);
    });
    let DefaultValues = {};

    if (ProfileQuery.data?.Id) {
        DefaultValues = {
            Id: ProfileQuery.data.Id,
            TutorId: ProfileQuery.data.TutorId,
            GeoLocation: {
                Longitude: ProfileQuery.data.GeoLocation.Longitude,
                Latitude: ProfileQuery.data.GeoLocation.Latitude
            },
            City: ProfileQuery.data.City,
            Country: ProfileQuery.data.Country,
            FullLocation: ProfileQuery.data.FullLocation,
            Education: ProfileQuery.data.Education,
            Olympiads: ProfileQuery.data.Olympiads,
            IsRemote: ProfileQuery.data.IsRemote,
            IsStationary: ProfileQuery.data.IsStationary,
            Description: ProfileQuery.data.Description
        };
    } else {
        DefaultValues = {
            Id: undefined,
            TutorId: UseUserClaims()?.Id,
            GeoLocation: {
                Longitude: undefined,
                Latitude: undefined
            },
            City: '',
            Country: 'Poland',
            FullLocation: '',
            Education: undefined,
            Olympiads: [],
            IsRemote: true,
            IsStationary: false,
            Description: ''
        };
    }

    return (
        <MyFormProvider<IProfileForm> FormResolver={IProfileFormResolver} DefaultValues={DefaultValues}
            OnSubmit={(FormData: IProfileForm) => mutate(FormData)} ClassName="mx-auto max-w-[700px]"
            IsFetched={ProfileQuery.isFetched} IsLoading={ProfileQuery.isLoading}
        >
            <h2 className="text-2xl font-bold text-dark mb-6">Pozwól swoim uczniom poznać się bliżej</h2>
            <InnerForm DefaultValues={DefaultValues as IProfileForm} />
            <SuccessErrorToastsPair 
                SuccessTitle="Profil został zaaktualizowany"
                ErrorTitle="Zapisywanie twojego profilu nie powiodło się"
                IsSuccessToastTriggered={isSuccess}
                IsErrorToastTriggered={isError}
                SuccessContent={
                    <p className="text-base font-medium">
                        Twoja wizytówka została pomyślnie zaaktualizowana. W ciągu kilku minut uczniowie będą w stanie zobaczyć twój nowy profil tutora.
                    </p>
                }
                ErrorContent={
                    <p className="text-base font-medium">
                        Niestety nie udało nam się zapisać twojego nowego profilu tutora. Spróbuj ponownie później. W przypadku utrzymywania się błędu, skontaktuj się z nami.
                    </p>
                }
            />
        </MyFormProvider>
    );
};

const InnerForm = (Props: { DefaultValues: IProfileForm}) => {
    const { watch, setValue, setError, clearErrors } = useFormContext();
    const LocationQuery = UseLocationQuery(watch('City'), watch('Country'));
    const { DefaultValues } = Props;

    const UpdateUserLocation = async () => {
        const NewLocationQueryResult = await LocationQuery.refetch();
        if (NewLocationQueryResult.data?.data && NewLocationQueryResult.data?.data.length > 0) {
            setValue('FullLocation', NewLocationQueryResult.data?.data[0].display_name);
            setValue('GeoLocation.Latitude', parseFloat(NewLocationQueryResult.data?.data[0].lat));
            setValue('GeoLocation.Longitude', parseFloat(NewLocationQueryResult.data?.data[0].lon));
            clearErrors('FullLocation');
        } else {
            setError('City', { type: 'manual', message: 'Nie znaleziono takiego miasta' });
            setError('FullLocation', { type: 'manual', message: 'Nie udało się wyszukać jakiejkolwiek lokalizacji' });
        }
    };

    const UpdateUserOlympiads = (Options: EuiComboBoxOptionOption<string>[]) => {
        const OldOlympiads: { Name: string, Experience?: string } [] = watch('Olympiads');
        const NewOlympiads: { Name: string, Experience?: string } [] = [];

        Options.forEach((Option) => {
            NewOlympiads.push({
                Name: Option.value!,
                Experience: OldOlympiads.find((Olympiad) => Olympiad.Name === Option.value)?.Experience
            });
        });

        setValue('Olympiads', NewOlympiads);
    };

    return (
        <>
            <div className="w-full flex flex-row flex-wrap justify-between mb-5">
                <MySelectField<string> 
                    Label="Wykształcenie"
                    Name="Education"
                    Placeholder="Wybierz swój obecny poziom edukacji, który realizujesz"
                    Options={[
                        { value: "STUDENT", inputDisplay: <span>Uczeń</span>, dropdownDisplay: <span className="text-sm text-semi-dark-alt font-semibold">Uczeń</span> },
                        { value: "BACHELOR", inputDisplay: <span>Licencjat</span>, dropdownDisplay: <span className="text-sm text-semi-dark-alt font-semibold">Licencjat</span> },
                        { value: "MASTERS", inputDisplay: <span>Magisterka</span>, dropdownDisplay: <span className="text-sm text-semi-dark-alt font-semibold">Magisterka</span> },
                        { value: "PHD", inputDisplay: <span>Doktorat</span>, dropdownDisplay: <span className="text-sm text-semi-dark-alt font-semibold">Doktorat</span> },
                    ]}
                    Prepend={<EuiIcon type="training" />}
                    FullWidth
                    ClassNameRow="w-full md:w-[45%] MarginTopNoneImportant"
                />
                <MySelectField<string> 
                    Label="Państwo"
                    Name="Country"
                    Options={[
                        { value: "Poland", inputDisplay: <span>Polska</span>, dropdownDisplay: <span className="text-sm text-semi-dark-alt font-semibold">Polska</span> },
                        { value: "UK", inputDisplay: <span>Wielka Brytania</span>, dropdownDisplay: <span className="text-sm text-semi-dark-alt font-semibold">Wielka Brytania</span> },
                        { value: "USA", inputDisplay: <span>USA</span>, dropdownDisplay: <span className="text-sm text-semi-dark-alt font-semibold">USA</span> },
                        { value: "Germany", inputDisplay: <span>Niemcy</span>, dropdownDisplay: <span className="text-sm text-semi-dark-alt font-semibold">Niemcy</span> },
                        { value: "Canada", inputDisplay: <span>Kanada</span>, dropdownDisplay: <span className="text-sm text-semi-dark-alt font-semibold">Kanada</span> },
                        { value: "Italy", inputDisplay: <span>Włochy</span>, dropdownDisplay: <span className="text-sm text-semi-dark-alt font-semibold">Włochy</span> },
                        { value: "France", inputDisplay: <span>Francja</span>, dropdownDisplay: <span className="text-sm text-semi-dark-alt font-semibold">Francja</span> },
                        { value: "Netherlands", inputDisplay: <span>Holandia</span>, dropdownDisplay: <span className="text-sm text-semi-dark-alt font-semibold">Holandia</span> },
                        { value: "Belgium", inputDisplay: <span>Belgia</span>, dropdownDisplay: <span className="text-sm text-semi-dark-alt font-semibold">Belgia</span> },
                        { value: "Spain", inputDisplay: <span>Hiszpania</span>, dropdownDisplay: <span className="text-sm text-semi-dark-alt font-semibold">Hiszpania</span> },
                    ]}
                    Prepend={<EuiIcon type="visMapRegion" />}
                    FullWidth
                    ClassNameRow="w-full md:w-[45%] MarginTopNoneImportant"
                />
            </div>
            <MyTextField 
                Name="City" 
                Label="Miasto zamieszkania" 
                Placeholder="Wpisz miasto w którym mógłbyś swiadczyć swoje usługi stacjonarnie"
                HelpText="Po wpisaniu użyj przycisku znalezienia lokalizacji, abyśmy mogli zapisać lokalizację twojego miasta" 
                FullWidth 
                Icon="visVisualBuilder"
                IsLoading={LocationQuery.isLoading}
                Append={
                    <EuiFlexItem grow={false}>
                        <EuiButtonEmpty color="primary" iconType="lensApp" onClick={() => UpdateUserLocation()}>
                            Znajdź
                        </EuiButtonEmpty>
                    </EuiFlexItem>
                }
            />
            <MyTextField 
                Name="FullLocation" 
                Label="Lokalizacja" 
                Placeholder="Tutaj znajdzie się twoja lokalizacja"
                HelpText="Twoja lokalizacja uzyskana na podstawie miasta i kraju" 
                Icon="visMapCoordinate"
                IsLoading={LocationQuery.isLoading}
                FullWidth 
                Readonly
            />
            <div className="w-full flex-col my-6">
                <label className="inline-block font-semibold mb-0.5" 
                    style={{ color: '#1a1c21', fontSize: '0.8571428571rem', lineHeight: '1.1428571429rem' }}
                >
                    Forma zajęć
                </label>
                <div className="flex justify-evenly flex-row flex-wrap w-full">
                    <MySwitch Label="Zajęcia online" Name="IsRemote" ClassName="my-3" />
                    <MySwitch Label="Zajęcia stacjonarne w moim mieście" Name="IsStationary" ClassName="my-3" />
                </div>
            </div>
            <MyMultiSelectField
                Name="Olympiads" 
                Label="Olimpiady przedmiotowe" 
                OnChange={UpdateUserOlympiads}
                Options={UseOlympiadsLabelValuePair()}
                DefaultSelectedOptions={UseOlympiadsLabelValuePair().filter(DictionaryOlympiad => 
                    DefaultValues.Olympiads.some(InitalOlympiad => DictionaryOlympiad.value === InitalOlympiad.Name))}
                Placeholder="Wybierz olimpiady, w których zostałeś przynajmniej finalistą"
                HelpText="Zaznacz tylko te olimpiady, w obrębie których chcesz udzielać zajęć innym"
                Prepend={<EuiIcon type="documentation" />}
                FullWidth 
            />
            <div className="w-full flex flex-row flex-wrap justify-between mb-5 mt-7">
                {watch('Olympiads').map((Olympiad: { Name: string, Experience?: string }, Index: number) => {
                    return (
                        <MySelectField<string> 
                            key={Index}
                            Label={UseOlympiadsLabelValuePair().find(DictionaryOlympiad => 
                                DictionaryOlympiad.value === Olympiad.Name)?.label + ' - lokata'}
                            Name={`Olympiads.${Index}.Experience`}
                            Placeholder="Wybierz najwyższe osiągnięcie w danej olimpiadzie spośród dostępnych"
                            Options={[
                                { value: "FINALIST", inputDisplay: <span>Finalista</span>, dropdownDisplay: <span className="text-sm text-semi-dark-alt font-semibold">Finalista</span> },
                                { value: "LAUREATE", inputDisplay: <span>Laureat</span>, dropdownDisplay: <span className="text-sm text-semi-dark-alt font-semibold">Laureat</span> },
                                { value: "INTERNATIONAL", inputDisplay: <span>Olimpiada międzynarodowa</span>, dropdownDisplay: <span className="text-sm text-semi-dark-alt font-semibold">Olimpiada międzynarodowa</span> },
                                { value: "WINNER", inputDisplay: <span>Zwycięzca</span>, dropdownDisplay: <span className="text-sm text-semi-dark-alt font-semibold">Zwycięzca</span> },
                            ]}
                            HelpText="Najwyższa osiągnięta lokata"
                            Prepend={<EuiIcon type="stats" />}
                            FullWidth
                            ClassNameRow="w-full md:w-[45%] MarginTopNoneImportant mb-4"
                        />
                    );
                })}
            </div>
            <MyTinyMCETextEditor Name="Description" Label="Mój opis" InitialValue={DefaultValues.Description} />
            <MyStandardButton Type="submit" Text="Zapisz mój profil" onClick={() => {}} 
                Icon="icon-[material-symbols--person-pin-circle-rounded]" 
                ClassName="mt-8 bg-brand-purple-light hover:text-dark px-8 mx-auto md:px-20 md:ml-auto md:mr-0 w-auto" 
            />
        </>
    );
};

export default ProfileForm;