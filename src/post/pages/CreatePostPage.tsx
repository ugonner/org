import { IonCol, IonContent, IonGrid, IonRow, useIonRouter } from "@ionic/react"
import { CreateOrUpdatePost } from "../components/CreateOOrUpdatePost"
import { PostRoutes } from "../enums/route"

export const CreatePostPage = () => {
    const router = useIonRouter();

    return (
        
        <IonContent>
            <IonGrid>
                <IonRow>
                    <IonCol size="12">
                        <h1 className="large-text">
                            Create New Post
                        </h1>
                    </IonCol>
                </IonRow>
            </IonGrid>
                   <CreateOrUpdatePost onCompletion={() => router.push(`${PostRoutes.ALL}?`)} />
                 
        </IonContent>
    )

}