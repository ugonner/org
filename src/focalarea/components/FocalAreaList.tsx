import { IonButton, IonCol, IonGrid, IonIcon, IonItem, IonModal, IonRow } from "@ionic/react";
import { FocalAreaCard } from "./FocalAreaCard";
import { FocalAreaMenu } from "./FocalAreaMenu";
import { IFocalArea } from "../interfaces/focalarea";
import { useState } from "react";
import { addCircle, closeCircle } from "ionicons/icons";
import { CreateOrUpdateFocalArea } from "./CreateOrUpdateFocalArea";

export interface IFocalAreaListProps {
    focalAreas: IFocalArea[];
}

export const FocalAreaList = ({focalAreas}: IFocalAreaListProps) => {
    const [openCreateFocalAreaOverlay, setOpenCreateFocalAreaOverlay] = useState(false);

    return (
        <IonGrid>
            <IonRow>
                <IonCol size="12">
                    <IonItem>
                        <IonButton 
                        fill="clear"
                        onClick={() => setOpenCreateFocalAreaOverlay(true)}
                        aria-haspopup={true}
                        aria-expanded={openCreateFocalAreaOverlay}
                        >
                            Add <IonIcon icon={addCircle} />
                        </IonButton>
                    </IonItem>
                </IonCol>
            </IonRow>
            {
                focalAreas?.map((focalArea) => (
                    <IonRow key={focalArea.id}>
                        <IonCol size="11">
                            <FocalAreaCard focalArea={focalArea} />
                        </IonCol>
                        <IonCol size="11">
                            <FocalAreaMenu focalArea={focalArea} />
                        </IonCol>
                    </IonRow>
                ))
            }
            <IonModal
            isOpen={openCreateFocalAreaOverlay}
            onDidDismiss={() => setOpenCreateFocalAreaOverlay(false)}
            >
                <IonItem>
                    <IonIcon slot="end" role="button" aria-label="close" onClick={() => setOpenCreateFocalAreaOverlay(false)} icon={closeCircle} />
                </IonItem>
                <CreateOrUpdateFocalArea onCompletion={() => setOpenCreateFocalAreaOverlay(false)} />
            </IonModal>
        </IonGrid>
    )
}