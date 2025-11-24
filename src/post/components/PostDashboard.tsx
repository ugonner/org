import { useRef, useState } from "react"
import { APIBaseURL, getData } from "../../shared/api/base";
import { IonButton, IonCol, IonGrid, IonIcon, IonItem, IonRow, IonSearchbar } from "@ionic/react";
import { IQueryResult } from "../../shared/interfaces/api-response";
import { useAsyncHelpersContext } from "../../shared/contexts/async-helpers";
import { QueryFilter } from "../../shared/components/general/QueryFilter";
import { useIInitContextStore } from "../../shared/contexts/InitContextProvider";
import { ISelectOption } from "../../shared/components/form/MultiSelector";
import { PostCard } from "./PostCard";
import { Pagination } from "../../shared/components/general/Pagination";

import { formatCamelCaseToSentence } from "../../shared/helpers";
import { folderOpen, folderOpenOutline } from "ionicons/icons";
import { IPost } from "../interfaces/post";
import { PostRoutes } from "../enums/route";
import { PostMenu } from "./PostMenu";

export const PostDashboard = () => {
    const {setLoading, handleAsyncError} = useAsyncHelpersContext();

    const {categorysRef, focalAreasRef} = useIInitContextStore();

    const queryPayloadRef = useRef<{[key: string]: unknown}>({});
    const [queryPayload, setQueryPayload] = useState<{[key: string]: unknown}>({});
    const queryBaseUrl = `${APIBaseURL}/post`;
    const [queryResult, setQueryResult] = useState<IQueryResult<IPost>>({} as IQueryResult<IPost>)
   
    const getResults = async () => {
        try{
            setLoading({isLoading: true, loadingMessage: "getting results"})
            const res = await getData<IQueryResult<IPost>>(queryBaseUrl, {...queryPayloadRef.current});
            setQueryResult(res);
            setLoading({isLoading: false, loadingMessage: ""})
        }catch(error){
            handleAsyncError(error, "Error getting results");
        }
    }
   
    return (
        <IonGrid>
            <IonRow>
                <IonCol size="12">
                    <h2>Post</h2>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol size="12">
                    <IonItem>
                        <IonButton slot="end" routerLink={PostRoutes.CREATE}>
                            Create New
                        </IonButton>
                    </IonItem>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol size="4">
                    <div className="ion-text-center">
                        {queryResult.total}
                        <br/> <small>Total</small>
                    </div>
                </IonCol>
                <IonCol size="4">
                    <IonItem>
                        <IonSearchbar
                        aria-label="search service profiles"
                        onIonInput={(evt) => {
                            if(evt.detail?.value && evt.detail?.value.length < 4) return;
                            queryPayloadRef.current = {...queryPayloadRef.current, searchTerm: evt.detail?.value};
                            getResults();
                        }}
                        />
                    </IonItem>
                </IonCol>
                <IonCol size="4">
                    <QueryFilter
                    queryPayloadRef={queryPayloadRef}
                    queryUrl={queryBaseUrl}
                    setResult={setQueryResult}
                    queryInputs={[
                        
                        {
                            name: "isPublished",
                            type: "select",
                            value: [
                                {name: "Published", value: true},
                                {name: "UnPublished", value: false}
                            ]
                        },
                        {
                            name: "categoryIds",
                            type: "select",
                            value: categorysRef.current.map((item) => ({
                                name: item.name, value: item.id
                            } as ISelectOption))
                        },
                        {
                            name: "focalAreaIds",
                            type: "select",
                            value: focalAreasRef.current.map((item) => ({
                                name: item.name, value: item.id
                            } as ISelectOption))
                        },
                        {
                            name: "dDay",
                            type: "dateRange",
                            value: [],
                            
                        }
                        
                    ]}
                    />
                </IonCol>
            </IonRow>
                {
                    queryResult.data?.map((post) => (
                        <IonRow key={post.id}>
                            <IonCol size="11">
                                <PostCard post={post} />
                            </IonCol>
                            <IonCol size="1">
                                <PostMenu post={post} />
                            </IonCol>
                            
                        </IonRow>
                    ))
                }
                {
                    (!queryResult.data?.length) && (
                        <div style={{textAlign: "center"}}>
                            <div style={{fontSize: "2em"}}>
                                <IonIcon icon={folderOpenOutline}></IonIcon>
                            </div>
                            <div>No Items</div>
                        </div>
                    )
                }
                <IonRow>
                    <IonCol size="12">
                        <Pagination
                        queryBaseUrl={queryBaseUrl}
                        queryPayloadRef={queryPayloadRef}
                        setQueryResult={setQueryResult}
                        limit={10}
                        totalItems={queryResult.total}
                        />
                    </IonCol>
                </IonRow>

        </IonGrid>
    )
}