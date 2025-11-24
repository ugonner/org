import { LegacyRef, useRef, useState } from "react";
import {
  IonAvatar,
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonRow,
} from "@ionic/react";
import { pinSharp } from "ionicons/icons";
import { useIInitContextStore } from "../../shared/contexts/InitContextProvider";
import {
  ISelectOption,
  MultiSelector,
} from "../../shared/components/form/MultiSelector";
import { IFocalArea } from "../interfaces/focalarea";

export interface IFocalAreaManagerProps {
  initFocalAreas: IFocalArea[];
  onCompletion: (focalAreas: IFocalArea[]) => void;
  label: string;
}

export const FocalAreaManager = ({
  initFocalAreas,
  onCompletion,
  label,
}: IFocalAreaManagerProps) => {
  const { focalAreasRef, setReLoadEntities } = useIInitContextStore();

  const focalAreasSearchInputRef = useRef<HTMLIonInputElement>();

  const [focalAreaDtos, setFocalAreaDtos] = useState<IFocalArea[]>(initFocalAreas || []);
  const [openFocalAreasSearchList, setOpenFocalAreasSearchList] = useState(false);
  const [focalAreasSearchList, setFocalAreasSearchList] = useState<IFocalArea[]>([]);
  const [openFocalAreasSelectorOverlay, setOpenFocalAreasSelectorOverlay] = useState(false);

  return (
    <div>
      <IonItem
        role="button"
        aria-haspopup={true}
        aria-expanded={openFocalAreasSelectorOverlay}
        onClick={() => setOpenFocalAreasSelectorOverlay(!openFocalAreasSelectorOverlay)}
      >
        <IonAvatar>
          <IonIcon size="large" icon={pinSharp}></IonIcon>
        </IonAvatar>
        <IonLabel>
          <h3>{label}</h3>
          <p>
            {
                focalAreaDtos.map((focalArea, index) => (
                    <small key={index} className="ion-margin-horizontal ion-text-bold">{focalArea.name}</small>
                ))
            }
          </p>
          <small> click to Add and / or remove focalAreas </small>
        </IonLabel>
      </IonItem>
      <IonModal
        isOpen={openFocalAreasSelectorOverlay}
        onDidDismiss={() => setOpenFocalAreasSelectorOverlay(false)}
      >
        <IonContent>
          <IonGrid>
            <IonRow>
              <IonCol size="12">
                <IonItem>
                  {["save", "cancel"].map((item) => (
                    <span
                      key={item}
                      role="button"
                      slot="end"
                      aria-label={item}
                      onClick={() => {
                        if (item === "save") onCompletion(focalAreaDtos);
                        setOpenFocalAreasSelectorOverlay(false);
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12" sizeSm="6">
                <MultiSelector
                  options={focalAreasRef.current?.map((focalArea) => ({
                    name: focalArea.name,
                    value: focalArea.id,
                  }))}
                  initValues={focalAreaDtos.map((focalArea) => ({
                    name: focalArea.name,
                    value: focalArea.id,
                  }))}
                  label="Categorize your item by groupings ie focalAreas"
                  onSelection={(values: ISelectOption[]) => {
                    const selectedFocalAreas: IFocalArea[] = values.map((focalArea) => ({
                      name: focalArea.name, id: focalArea.value as number
                    }));
                    setFocalAreaDtos([ ...selectedFocalAreas ]);
                  }}
                />
              </IonCol>
             
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonModal>
    </div>
  );
};
