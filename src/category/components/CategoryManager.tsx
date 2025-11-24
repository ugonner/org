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
import { ICategory } from "../interfaces/category";

export interface ICategoryManagerProps {
  initCategorys: ICategory[];
  onCompletion: (categorys: ICategory[]) => void;
  label: string;
}

export const CategoryManager = ({
  initCategorys,
  onCompletion,
  label,
}: ICategoryManagerProps) => {
  const { categorysRef, setReLoadEntities } = useIInitContextStore();

  const categorysSearchInputRef = useRef<HTMLIonInputElement>();

  const [categoryDtos, setCategoryDtos] = useState<ICategory[]>(initCategorys);
  const [openCategorysSearchList, setOpenCategorysSearchList] = useState(false);
  const [categorysSearchList, setCategorysSearchList] = useState<ICategory[]>([]);
  const [openCategorysSelectorOverlay, setOpenCategorysSelectorOverlay] = useState(false);

  return (
    <div>
      <IonItem
        role="button"
        aria-haspopup={true}
        aria-expanded={openCategorysSelectorOverlay}
        onClick={() => setOpenCategorysSelectorOverlay(!openCategorysSelectorOverlay)}
      >
        <IonAvatar>
          <IonIcon size="large" icon={pinSharp}></IonIcon>
        </IonAvatar>
        <IonLabel>
          <h3>{label}</h3>
          <p>
            {
                categoryDtos.map((category, index) => (
                    <small key={index} className="ion-margin-horizontal ion-text-bold">{category.name}</small>
                ))
            }
          </p>
          <small> click to Add and / or remove categorys </small>
        </IonLabel>
      </IonItem>
      <IonModal
        isOpen={openCategorysSelectorOverlay}
        onDidDismiss={() => setOpenCategorysSelectorOverlay(false)}
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
                        if (item === "save") onCompletion(categoryDtos);
                        setOpenCategorysSelectorOverlay(false);
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
                  options={categorysRef.current?.map((category) => ({
                    name: category.name,
                    value: category.id,
                  }))}
                  initValues={categoryDtos.map((category) => ({
                    name: category.name,
                    value: category.id,
                  }))}
                  label="Categorize your item by groupings ie categorys"
                  onSelection={(values: ISelectOption[]) => {
                    const selectedCategorys: ICategory[] = values.map((category) => ({
                      name: category.name, id: category.value as number
                    }));
                    setCategoryDtos([ ...selectedCategorys ]);
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
