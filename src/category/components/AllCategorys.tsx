import { IonCol, IonGrid, IonImg, IonItem, IonRow } from "@ionic/react";
import { defaultCategoryImageUrl } from "./CategoryCard";
import { ICategory } from "../interfaces/category";

export interface IAllCategorysProps {
    categorys: ICategory[];
}
export const AllCategorys = ({categorys}: IAllCategorysProps) => {
    return (
        <IonGrid>
            <IonRow>
                <IonCol size="12" className="ion-text-center">
                    <h1 className="large-text">Blog</h1>
                    <p>You can go through the latest updates on the following categories / sections of our programs</p>
                </IonCol>
            </IonRow>
            <IonRow>
                    
            {
                categorys.map((category, index) => (
                        <IonCol key={index} size="12" sizeSm="4">
                            <IonItem>
                                <IonImg src={category.avatar || defaultCategoryImageUrl} alt={category.name} />
                            </IonItem>
                            <h2 className="large-text">{category.name}</h2>
                            <p>{category.description}</p>
                        </IonCol>
                ))
            }
            </IonRow>
        </IonGrid>
    )
} 