import UseProfileQuery from "../../../api/requests/profile/queries/UseProfileQuery";
import IPricingForm, { IPricingFormResolver } from "../../../api/types/pricing/IPricingForm";
import UseUserClaims from "../../../hooks/auth/UseUserClaims";
import UseOlympiadsLabelValuePair from "../../../hooks/constants/UseOlympiadsLabelValuePair";
import MyFormProvider from "../../../providers/MyFormProvider";
import PricingBoxForEducationalService from "../../molecules/forms/PricingBoxForEducationalService";
import UseOlympiadsLogos from "../../../hooks/constants/UseOlympiadsLogos";
import UsePricingMutation from "../../../api/requests/pricing/mutations/UsePricingMutation";
import SuccessErrorToastsPair from "../../modals/toasts/SuccessErrorToastsPair";
import UsePricingQuery from "../../../api/requests/pricing/queries/UsePricingQuery";
import { useQueryClient } from "@tanstack/react-query";
import MyStandardButton from "../../atoms/buttons/MyStandardButton";
import EmptyNotification from "../../EmptyNotification";

function PricingForm() {
    const QueryClient = useQueryClient();
    const PricingQuery = UsePricingQuery();
    const ProfileQuery = UseProfileQuery();
    const { mutate, isSuccess, isError, isLoading } = UsePricingMutation(() => {
        QueryClient.invalidateQueries(["UserPricingModules"]);
        QueryClient.invalidateQueries(["Me"]);
    });

    let DefaultValues: IPricingForm [] | undefined = ProfileQuery.data?.Olympiads.map((Olympiad, Index) => {
        const ExistingPriceModule = PricingQuery.data?.find(({ Name }) => Olympiad.Name === Name);
        if (ExistingPriceModule) {
            return {
                Id: undefined,
                TutorId: UseUserClaims()?.Id,
                Name: Olympiad.Name,
                BasePrice: ExistingPriceModule.BasePrice,
                DoublePackagePrice: 0,
                TriplePackagePrice: 0,
                FivePackagePrice: 0,
                TenPackagePrice: 0,
                IsDoublePackagePriceActive: ExistingPriceModule.IsDoublePackagePriceActive,
                IsTriplePackagePriceActive: ExistingPriceModule.IsTriplePackagePriceActive,
                IsFivePackagePriceActive: ExistingPriceModule.IsFivePackagePriceActive,
                IsTenPackagePriceActive : ExistingPriceModule.IsTenPackagePriceActive
            } as IPricingForm;
        } else {
            return {
                Id: undefined,
                TutorId: UseUserClaims()?.Id,
                Name: Olympiad.Name,
                BasePrice: 0,
                DoublePackagePrice: 0,
                TriplePackagePrice: 0,
                FivePackagePrice: 0,
                TenPackagePrice: 0,
                IsDoublePackagePriceActive: false,
                IsTriplePackagePriceActive: false,
                IsFivePackagePriceActive: false,
                IsTenPackagePriceActive : false
            } as IPricingForm;
        }
    });

    if (ProfileQuery.isFetched && (DefaultValues?.length === 0 || !DefaultValues)) {
        return <EmptyNotification 
            Message="Musisz najpierw wybrać olimpiady na swoim profilu aby dopasować do nich cennik" 
            ClassName="max-w-[350px] mx-auto"
        />;
    }

    return (
        <MyFormProvider<IPricingForm []> FormResolver={IPricingFormResolver} DefaultValues={DefaultValues}
            OnSubmit={(FormData: IPricingForm []) => mutate(FormData)} ClassName="mx-auto max-w-[1050px] px-8 md:px-11"
            IsFetched={ProfileQuery.isFetched && PricingQuery.isFetched} 
            IsLoading={ProfileQuery.isLoading || PricingQuery.isLoading || isLoading}
        >
            {ProfileQuery.data?.Olympiads.map((Olympiad, Index: number) => {
                return (
                    <PricingBoxForEducationalService 
                        key={Index}
                        OrderIdentifier={Index}
                        Name={UseOlympiadsLabelValuePair().find(({ value }) => Olympiad.Name === value)?.label}
                        Color={UseOlympiadsLabelValuePair().find(({ value }) => Olympiad.Name === value)?.color}
                        Logo={UseOlympiadsLogos()[Olympiad.Name]}
                    />
                );
            })}
            <MyStandardButton Type="submit" Text="Zapisz mój cennik" onClick={() => {}} 
                Icon="icon-[fluent--people-money-20-filled]" 
                ClassName="mt-4 mb-6 bg-brand-purple-light hover:text-dark px-8 mx-auto md:px-20 md:ml-auto md:mr-0 w-auto" 
            />
            <SuccessErrorToastsPair 
                SuccessTitle="Cennik został zaaktualizowany"
                ErrorTitle="Zapisywanie twojego cennika nie powiodło się"
                IsSuccessToastTriggered={isSuccess}
                IsErrorToastTriggered={isError}
                SuccessContent={
                    <p className="text-base font-medium">
                        Twoje stawki za wybrane usługi i pakiety zostały pomyślnie zaaktualizowane. W ciągu kilku minut uczniowie będą w stanie zarezerwować u Ciebie zajęcia według nowego cennika.
                    </p>
                }
                ErrorContent={
                    <p className="text-base font-medium">
                        Niestety nie udało nam się zapisać twojego nowego cennika. Spróbuj ponownie później. W przypadku utrzymywania się błędu, skontaktuj się z nami.
                    </p>
                }
            />
        </MyFormProvider>
    );
};

export default PricingForm;