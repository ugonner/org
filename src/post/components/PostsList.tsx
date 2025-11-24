import { useEffect, useRef, useState } from "react";
import { APIBaseURL, getData } from "../../shared/api/base";
import { IQueryResult } from "../../shared/interfaces/api-response";
import { useAsyncHelpersContext } from "../../shared/contexts/async-helpers";
import { getLocalUser } from "../../utils";
import { IonIcon, IonItem, IonLabel, IonList } from "@ionic/react";
import { Pagination } from "../../shared/components/general/Pagination";
import { folderOpenOutline } from "ionicons/icons";
import { PostCard } from "./PostCard";
import { IPost } from "../interfaces/post";

export interface IPostsProps {
  queryPayload: { [key: string]: unknown };
}

export const PostsList = ({ queryPayload }: IPostsProps) => {
  const { setLoading, handleAsyncError } = useAsyncHelpersContext();

  const queryPayloadRef = useRef<{ [key: string]: unknown }>(queryPayload);
  const queryBaseUrl = `${APIBaseURL}/post`;
  const reportComments = useRef<IQueryResult<IPost>>(
    {} as IQueryResult<IPost>
  );

  const [postsResult, setAidServiceProfilesResult] = useState<
    IQueryResult<IPost>
  >({} as IQueryResult<IPost>);
  const getItems = async () => {
    try {
      setLoading({ isLoading: true, loadingMessage: "getting items" });
      const res = await getData<IQueryResult<IPost>>(
        queryBaseUrl,
        queryPayloadRef.current
      );
      setAidServiceProfilesResult(res);
      setLoading({ isLoading: false, loadingMessage: "" });
    } catch (error) {
      handleAsyncError(error, "Error getting items");
    }
  };
  useEffect(() => {
    getItems();
  }, []);

  return (
    <div>
      <IonList>
        {postsResult.data?.map((item, index ) => (
          <div style={{display: "flex"}} key={item.id} className="ion-margin">
            <div style={{fontSize: "2em"}}>
                {index + 1}
            </div>
             <PostCard
            post={item}
          />
          </div>
        ))}

        {!postsResult.data?.length && (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "3em" }}>
              <IonIcon icon={folderOpenOutline}></IonIcon>
            </div>
            <div>No items.</div>
          </div>
        )}
      </IonList>

      <Pagination
        queryBaseUrl={queryBaseUrl}
        queryPayloadRef={queryPayloadRef}
        setQueryResult={setAidServiceProfilesResult}
        limit={10}
        totalItems={postsResult.total}
      />
    </div>
  );
};
