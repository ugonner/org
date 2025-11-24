import { IonContent, IonPage, IonRouterOutlet } from "@ionic/react";
import { Route } from "react-router";
import { AdminRoutes } from "../enums/routes";
import { UserDashboard } from "../../user/pages/UserDashboard";
import { AdminDashboard } from "../pages/Dashboard";
import { AdminHeader } from "../../shared/components/partials/AdminHeader";
import { PaymentTransactionDashboard } from "../../payment/Components/TransactionDashboard";
import { NavigationBarGap } from "../../shared/components/partials/NavigationBarGap";
import { PostDashboardPage } from "../../post/pages/PostDashboardPage";

export const AdminLayout = () => {
  return (
    <IonPage>
      <AdminHeader title="Admin Dashboard" />
      <IonContent id="admin-menu-content">
<IonRouterOutlet>
        <Route path={AdminRoutes.HOME} component={AdminDashboard} />
        <Route path={AdminRoutes.USER} component={UserDashboard} />
        <Route path={AdminRoutes.TRANSACTION} component={PaymentTransactionDashboard} />
        <Route path={AdminRoutes.POST} component={PostDashboardPage} />
      </IonRouterOutlet>
      {/* <NavigationBarGap /> */}
      </IonContent>
      
    </IonPage>
  );
};
