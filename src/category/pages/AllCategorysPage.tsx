import { IonContent } from "@ionic/react";
import { useIInitContextStore } from "../../shared/contexts/InitContextProvider"
import { AllCategorys } from "../components/AllCategorys";
import { BaseFooter } from "../../shared/components/partials/BaseFooter";

export const AllCategorysPage = () => {
    const {categorysRef} = useIInitContextStore();

    return (
        <IonContent>
            <AllCategorys categorys={categorysRef.current} />
            <BaseFooter />
        </IonContent>
    )
}