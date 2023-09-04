import UseMe from "../app/api/requests/auth/queries/UseMe";
import StripeAccountConfigureAlert from "../app/components/molecules/alerts/StripeAccountConfigureAlert";
import PageHeader from "../app/components/organisms/page_parts/PageHeader";

function Page() {
    const { data } = UseMe();
    
    return (
        <>
            <PageHeader
                UpperHeader="Historia płatności"
                Header="Płatności, transkacje, zwroty i wypłaty - wszystkie szczegóły w jednym miejscu"
                Paragraphs={[
                    "Wszystkie płatności wykonane przez uczniów na twoje konto oraz ich szczegóły możesz sprawdzić na poniższej liście lub używając panelu Stripe'a.",
                    "Ponadto na platformie Stripe możesz w jednym miejscu zarządzać wszystkimi płatnościami (np. wpłatami od uczniów), realizować wypłaty na własne konto bankowe czy monitorować przepływy pieniężne w obrębie całego konta."
                ]}
                ImageSrc="/illustrated/Payments.jpg"
                ImageAlt="Payments"
            />
            <h1 className="mt-10 text-4xl text-dark font-bold cursor-default text-center mx-auto px-6">
                Moje płatności i wypłaty
            </h1>
            {!data?.IsStripeVerified && <StripeAccountConfigureAlert />}
        </>
    );
};

export default Page;