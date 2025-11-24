import { IonContent } from "@ionic/react"
import { AllFocalAreas } from "../components/AllFocalAreas"
import { useIInitContextStore } from "../../shared/contexts/InitContextProvider"
import { BaseFooter } from "../../shared/components/partials/BaseFooter";

export const AllFocalAreasPage = () => {
    const {focalAreasRef} = useIInitContextStore();

    return (
        <IonContent>
            <AllFocalAreas focalAreas={focalAreasRef.current} />
            <BaseFooter />
        </IonContent>
    )
}