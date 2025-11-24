import { IonAvatar, IonImg, IonItem, IonLabel } from "@ionic/react";
import { IFocalArea } from "../interfaces/focalarea";


export const defaultFocalAreaImageUrl = "/favicon.png";
export interface IFocalAreaCardProps {
  focalArea: IFocalArea;
}

export const FocalAreaCard = ({ focalArea }: IFocalAreaCardProps) => {
  return (
    <IonItem>
      <IonAvatar>
        <IonImg
          src={focalArea.avatar || defaultFocalAreaImageUrl}
          alt="focalArea"
        />
      </IonAvatar>
      <IonLabel>
        <h3>{focalArea.name}</h3>
        <p>{focalArea.description?.substring(0, 140)}</p>
      </IonLabel>
    </IonItem>
  );
};
