import { IonButton, IonCol, IonGrid, IonIcon, IonItem, IonModal, IonRow } from "@ionic/react";
import { CategoryCard } from "./CategoryCard";
import { CategoryMenu } from "./CategoryMenu";
import { useState } from "react";
import { addCircle, closeCircle } from "ionicons/icons";
import { CreateOrUpdateCategory } from "./CreateOrUpdateCategory";
import { ICategory } from "../interfaces/category";

export interface ICategoryListProps {
    categorys: ICategory[];
}

export const CategoryList = ({categorys}: ICategoryListProps) => {
    const [openCreateCategoryOverlay, setOpenCreateCategoryOverlay] = useState(false);

    return (
        <IonGrid>
            <IonRow>
                <IonCol size="12">
                    <IonItem>
                        <IonButton 
                        fill="clear"
                        onClick={() => setOpenCreateCategoryOverlay(true)}
                        aria-haspopup={true}
                        aria-expanded={openCreateCategoryOverlay}
                        >
                            Add <IonIcon icon={addCircle} />
                        </IonButton>
                    </IonItem>
                </IonCol>
            </IonRow>
            {
                categorys?.map((category) => (
                    <IonRow key={category.id}>
                        <IonCol size="11">
                            <CategoryCard category={category} />
                        </IonCol>
                        <IonCol size="11">
                            <CategoryMenu category={category} />
                        </IonCol>
                    </IonRow>
                ))
            }
            <IonModal
            isOpen={openCreateCategoryOverlay}
            onDidDismiss={() => setOpenCreateCategoryOverlay(false)}
            >
                <IonItem>
                    <IonIcon slot="end" role="button" aria-label="close" onClick={() => setOpenCreateCategoryOverlay(false)} icon={closeCircle} />
                </IonItem>
                <CreateOrUpdateCategory onCompletion={() => setOpenCreateCategoryOverlay(false)} />
            </IonModal>
        </IonGrid>
    )
}