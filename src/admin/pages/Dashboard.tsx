import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonItem,
  IonModal,
  IonRow,
} from "@ionic/react";
import { useIInitContextStore } from "../../shared/contexts/InitContextProvider";
import { useEffect, useRef, useState } from "react";
import {
  briefcaseSharp,
  closeCircle,
  hammerSharp,
  peopleSharp,
  pinSharp,
} from "ionicons/icons";
import { formatCamelCaseToSentence } from "../../shared/helpers";
import { ServiceClusters } from "../../user/components/cluster/ServiceClusters";
import { ServiceRoles } from "../../user/components/role/ServiceRoles";
import { NavigationBarGap } from "../../shared/components/partials/NavigationBarGap";
import { CategoryList } from "../../category/components/CategoryList";
import { FocalAreaList } from "../../focalarea/components/FocalAreaList";

export type InitDataTypes = "categories" | "focal areas" | "clusters" | "roles" | "tags";
export const AdminDashboard = () => {
  const { clustersRef, categorysRef, focalAreasRef, rolesRef, tagsRef } =
    useIInitContextStore();
  const currentActionRef = useRef<InitDataTypes>()
  const [openActionOverlay, setOpenActionOverlay] = useState(false);

  const initData: {
    name: InitDataTypes;
    value: number;
    icon?: string;
  }[] = [
    {
      name: "categories",
      value: categorysRef.current?.length,
      icon: briefcaseSharp,
    },
    {
      name: "focal areas",
      value: focalAreasRef.current?.length,
      icon: briefcaseSharp,
    },
    {
      name: "clusters",
      value: clustersRef.current?.length,
      icon: peopleSharp,
    },
    {
      name: "roles",
      value: rolesRef.current?.length,
      icon: hammerSharp,
    },
    {
      name: "tags",
      value: tagsRef.current?.length,
      icon: pinSharp,
    },
  ];


  return (
    <IonContent>
      <IonGrid>
        <IonRow>
          {initData.map((item) => (
            <IonCol size="6" key={item.name}>
              <div
                className="ion-text-center"
                role="button"
                aria-label={`${formatCamelCaseToSentence(item.name)}`}
                onClick={() => {
                  currentActionRef.current = item.name;
                  setOpenActionOverlay(!openActionOverlay);
                }}
              >
                <h1>{item.value}</h1>
                <small>
                  <IonIcon
                    icon={item.icon}
                    className="ion-margin-horizontal"
                  ></IonIcon>
                  <span>{formatCamelCaseToSentence(item.name)}</span>
                </small>
              </div>
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>
      <IonModal
        isOpen={openActionOverlay}
        onDidDismiss={() => setOpenActionOverlay(false)}
      >
       <IonContent>
        <IonItem>
          <IonIcon
          slot="end"
          role="button"
          aria-label="close"
          onClick={() => setOpenActionOverlay(false)}
          icon={closeCircle}
          />

        </IonItem>
         <IonGrid>
        
          {currentActionRef.current === "clusters" && <ServiceClusters onCompletion={() => setOpenActionOverlay(false)} />}
          {currentActionRef.current === "roles" && <ServiceRoles onCompletion={() => setOpenActionOverlay(false)} />}
          {currentActionRef.current === "categories" && (<CategoryList categorys={categorysRef.current} />)}
          {currentActionRef.current === "focal areas" && (<FocalAreaList focalAreas={focalAreasRef.current} /> )}
          
        </IonGrid>
       </IonContent>
      </IonModal>
      <NavigationBarGap />
    </IonContent>
  );
};
