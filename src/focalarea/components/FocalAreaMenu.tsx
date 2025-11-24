import { useEffect, useRef, useState } from "react";

import {
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonList,
  IonModal,
  IonPopover,
  useIonRouter,
} from "@ionic/react";
import { closeCircle, ellipsisVertical } from "ionicons/icons";
import { CreateOrUpdateFocalArea } from "./CreateOrUpdateFocalArea";
import { useLocation } from "react-router";
import { FocalAreaMenuActions } from "../enums/focalarea";
import { IFocalArea } from "../interfaces/focalarea";
import { useAsyncHelpersContext } from "../../shared/contexts/async-helpers";
import { APIBaseURL, postData } from "../../shared/api/base";

export interface IFocalAreaMenuProps {
  focalArea: IFocalArea;
}

export const FocalAreaMenu = ({ focalArea }: IFocalAreaMenuProps) => {
  const location = useLocation();
  const router = useIonRouter();

  const { setLoading, handleAsyncError } = useAsyncHelpersContext();

  const [openActionsOverlay, setOpenActionsOverlay] = useState(false);
  const [openMenuOverlay, setOpenMenuOverlay] = useState(false);

  const actionsRef = useRef<FocalAreaMenuActions[]>([]);
  const currentActionRef = useRef<FocalAreaMenuActions>();

  const takeAction = async () => {
    try {
      setLoading({
        isLoading: true,
        loadingMessage: `Processing ${currentActionRef.current}`,
      });
      if (currentActionRef.current === FocalAreaMenuActions.DELETE) {
        await postData(`${APIBaseURL}/focalarea/${focalArea.id}`, {
          method: "delete",
        });
      }
      setLoading({ isLoading: false, loadingMessage: "" });
      setOpenActionsOverlay(false);
      router.push(`${location.pathname}?${location.search}`);
    } catch (error) {
      handleAsyncError(
        error,
        `Error with focalArea action: ${currentActionRef.current}`
      );
    }
  };
  useEffect(() => {
    actionsRef.current = Object.values(FocalAreaMenuActions);
  }, []);

  return (
    <div>
      <IonIcon
        id="focalArea-menu-trigger"
        role="button"
        aria-label="more actions"
        aria-haspopup={true}
        aria-expanded={openMenuOverlay}
        icon={ellipsisVertical}
      />

      <IonPopover
        isOpen={openMenuOverlay}
        trigger="focalArea-menu-trigger"
        onDidDismiss={() => setOpenMenuOverlay(false)}
      >
        <IonContent>
          <IonList>
            {actionsRef.current.map((action, index) => (
              <IonItem
                key={index}
                onClick={() => {
                  currentActionRef.current = action;
                  setOpenMenuOverlay(false);
                  setOpenActionsOverlay(true);
                }}
              >
                {action}
              </IonItem>
            ))}
          </IonList>
        </IonContent>
      </IonPopover>

      <IonModal
        isOpen={openActionsOverlay}
        onDidDismiss={() => setOpenActionsOverlay(false)}
      >
        <IonContent>
          <IonItem>
            <span>{currentActionRef.current}</span>
            <IonIcon
              slot="end"
              role="button"
              onClick={() => setOpenActionsOverlay(false)}
              icon={closeCircle}
            />
          </IonItem>
          <div>
            {![FocalAreaMenuActions.EDIT].includes(
              currentActionRef.current as FocalAreaMenuActions
            ) && (
              <div>
                <h3>
                  To Proceed with ${currentActionRef.current}, use the confirm
                  button, otherwise cancel action
                </h3>
                <IonButton expand="full" onClick={takeAction}>
                  Confirm
                </IonButton>
                <IonButton
                  expand="full"
                  onClick={() => setOpenActionsOverlay(false)}
                >
                  Cancel
                </IonButton>
              </div>
            )}
            {currentActionRef.current === FocalAreaMenuActions.EDIT && (
              <CreateOrUpdateFocalArea
                focalArea={focalArea}
                onCompletion={() => {
                  setOpenActionsOverlay(false);
                  router.push(`${location.pathname}?${location.search}`);
                }}
              />
            )}
          </div>
        </IonContent>
      </IonModal>
    </div>
  );
};
