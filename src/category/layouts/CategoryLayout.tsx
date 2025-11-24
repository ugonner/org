import { IonContent, IonPage, IonRouterOutlet } from "@ionic/react"
import { BaseHeader } from "../../shared/components/partials/BaseHeader"
import { Route } from "react-router"
import { CategoryRoutes } from "../enums/routes"
import { AllCategorysPage } from "../pages/AllCategorysPage"

export const CategoryLayout = () => {
    return (
        <IonPage>
            <BaseHeader title="Blog" />
            <IonContent>
                <IonRouterOutlet>
                    <Route path={CategoryRoutes.VIEW_SINGLE} component={AllCategorysPage} /> 
                    <Route path={CategoryRoutes.HOME} component={AllCategorysPage} />
                </IonRouterOutlet>
            </IonContent>
        </IonPage>
    )
}