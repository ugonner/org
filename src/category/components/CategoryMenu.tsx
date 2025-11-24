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
import { CreateOrUpdateCategory } from "./CreateOrUpdateCategory";
import { useLocation } from "react-router";
import { CategoryMenuActions } from "../enums/category";
import { ICategory } from "../interfaces/category";
import { useAsyncHelpersContext } from "../../shared/contexts/async-helpers";
import { APIBaseURL, postData } from "../../shared/api/base";

export interface ICategoryMenuProps {
  category: ICategory;
}

export const CategoryMenu = ({ category }: ICategoryMenuProps) => {
  const location = useLocation();
  const router = useIonRouter();

  const { setLoading, handleAsyncError } = useAsyncHelpersContext();

  const [openActionsOverlay, setOpenActionsOverlay] = useState(false);
  const [openMenuOverlay, setOpenMenuOverlay] = useState(false);

  const actionsRef = useRef<CategoryMenuActions[]>([]);
  const currentActionRef = useRef<CategoryMenuActions>();

  const takeAction = async () => {
    try {
      setLoading({
        isLoading: true,
        loadingMessage: `Processing ${currentActionRef.current}`,
      });
      if (currentActionRef.current === CategoryMenuActions.DELETE) {
        await postData(`${APIBaseURL}/category/${category.id}`, {
          method: "delete",
        });
      }
      setLoading({ isLoading: false, loadingMessage: "" });
      setOpenActionsOverlay(false);
      router.push(`${location.pathname}?${location.search}`);
    } catch (error) {
      handleAsyncError(
        error,
        `Error with category action: ${currentActionRef.current}`
      );
    }
  };
  useEffect(() => {
    actionsRef.current = Object.values(CategoryMenuActions);
  }, []);

  return (
    <div>
      <IonIcon
        id="category-menu-trigger"
        role="button"
        aria-label="more actions"
        aria-haspopup={true}
        aria-expanded={openMenuOverlay}
        icon={ellipsisVertical}
      />

      <IonPopover
        isOpen={openMenuOverlay}
        trigger="category-menu-trigger"
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
            {![CategoryMenuActions.EDIT].includes(
              currentActionRef.current as CategoryMenuActions
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
            {currentActionRef.current === CategoryMenuActions.EDIT && (
              <CreateOrUpdateCategory
                category={category}
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
