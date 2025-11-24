import { IonAvatar, IonImg, IonItem, IonLabel } from "@ionic/react";
import { ICategory } from "../interfaces/category";

export const defaultCategoryImageUrl = "/favicon.png";
export interface ICategoryCardProps {
  category: ICategory;
}

export const CategoryCard = ({ category }: ICategoryCardProps) => {
  return (
    <IonItem>
      <IonAvatar>
        <IonImg
          src={category.avatar || defaultCategoryImageUrl}
          alt="category"
        />
      </IonAvatar>
      <IonLabel>
        <h3>{category.name}</h3>
        <p>{category.description?.substring(0, 140)}</p>
      </IonLabel>
    </IonItem>
  );
};
