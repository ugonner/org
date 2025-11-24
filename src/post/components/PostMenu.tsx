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

import { useLocation } from "react-router";
import { IPost } from "../interfaces/post";
import { useAsyncHelpersContext } from "../../shared/contexts/async-helpers";
import { APIBaseURL, postData } from "../../shared/api/base";
import { PostMenuActions } from "../enums/post";
import { CreateOrUpdatePost } from "./CreateOOrUpdatePost";

export interface IPostMenuProps {
  post: IPost;
}

export const PostMenu = ({ post }: IPostMenuProps) => {
  const location = useLocation();
  const router = useIonRouter();

  const { setLoading, handleAsyncError } = useAsyncHelpersContext();

  const [openActionsOverlay, setOpenActionsOverlay] = useState(false);
  const [openMenuOverlay, setOpenMenuOverlay] = useState(false);

  const actionsRef = useRef<PostMenuActions[]>([]);
  const currentActionRef = useRef<PostMenuActions>();

  const takeAction = async () => {
    try {
      setLoading({
        isLoading: true,
        loadingMessage: `Processing ${currentActionRef.current}`,
      });
      if (currentActionRef.current === PostMenuActions.DELETE) {
        await postData(`${APIBaseURL}/post/${post.id}`, {
          method: "delete",
        });
      }
      if (currentActionRef.current === PostMenuActions.MANAGE_PUBLISH_STATUS) {
        await postData(`${APIBaseURL}/post/${post.id}/publish`, {
          method: "put",
          isPublished: !Boolean(post.isPublished),
        });
      }

      setLoading({ isLoading: false, loadingMessage: "" });
      setOpenActionsOverlay(false);
      router.push(`${location.pathname}?${location.search}`);
    } catch (error) {
      handleAsyncError(
        error,
        `Error with post action: ${currentActionRef.current}`
      );
    }
  };
  useEffect(() => {
    actionsRef.current = Object.values(PostMenuActions);
  }, []);

  return (
    <div>
      <IonIcon
        id="post-menu-trigger"
        role="button"
        aria-label="more actions"
        aria-haspopup={true}
        aria-expanded={openMenuOverlay}
        icon={ellipsisVertical}
      />

      <IonPopover
        isOpen={openMenuOverlay}
        trigger="post-menu-trigger"
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
            {![PostMenuActions.EDIT].includes(
              currentActionRef.current as PostMenuActions
            ) && (
              <div>
                <h3>
                  To Proceed with ${currentActionRef.current}, use the confirm
                  button, otherwise cancel action
                </h3>
                Action:{" "}
                {currentActionRef.current ===
                PostMenuActions.MANAGE_PUBLISH_STATUS
                  ? `Publish: ${!Boolean(post.isPublished)}`
                  : `${currentActionRef.current}`}
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
            {currentActionRef.current === PostMenuActions.EDIT && (
              <CreateOrUpdatePost
                post={post}
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
