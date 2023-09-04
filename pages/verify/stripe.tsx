import { useEffect } from "react";
import UseStripeVerifyMutation from "../../app/api/requests/payments/mutations/UseStripeVerifyMutation";
import LoadingScreen from "../../app/components/LoadingScreen";

function Page() {
    const { mutate } = UseStripeVerifyMutation();

    useEffect(() => {
        mutate();
    }, [])
    
    return (
        <>
            <LoadingScreen 
                Message="Konfigurujemy twoje płatności..." 
                ClassName="w-full h-full justify-center" 
            />
        </>
    );
};

export default Page;