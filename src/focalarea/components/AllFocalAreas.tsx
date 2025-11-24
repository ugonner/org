import { IonCol, IonGrid, IonImg, IonItem, IonRow } from "@ionic/react";
import { IFocalArea } from "../interfaces/focalarea";
import { defaultFocalAreaImageUrl } from "./FocalAreaCard";

export interface IAllFocalAreasProps {
  focalAreas: IFocalArea[];
}
export const AllFocalAreas = ({ focalAreas }: IAllFocalAreasProps) => {
  return (
    <IonGrid>
        <IonRow>
            <IonCol  size="12" className="ion-text-center ion-margin">
                <h1 className="large-text">Thematic Areas</h1>
                <p>You can browse through any of these thematic or focus aress to get update on our activites and programs in that area.</p>
            </IonCol>
        </IonRow>
      <IonRow>
        {focalAreas.map((focalArea, index) => (
          <IonCol key={index} size="12" sizeSm="4">
            <IonItem>
              <IonImg
                src={focalArea.avatar || defaultFocalAreaImageUrl}
                alt={focalArea.name}
              />
            </IonItem>
            <h2 className="large-text">{focalArea.name}</h2>
            <p>{focalArea.description}</p>
          </IonCol>
        ))}
      </IonRow>
    </IonGrid>
  );
};
