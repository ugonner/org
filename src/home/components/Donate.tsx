import { IonButton, IonCol, IonGrid, IonRow } from "@ionic/react";
import { DonateButton } from "../../payment/Components/DonateButton";
import { HomeRoutes } from "../enums/routes";

export const Donate = () => {
  return (
    <section id="donate" className="home-sections">
      <IonGrid>
        <IonRow>
          <IonCol size="9">
            <p className="large-text">
              Like what we are doing? You subscribe to our updates or can contribute to this social
              development project by donating to us.
            </p>
          </IonCol>
          <IonCol size="3">
            <p>
              <DonateButton />
            </p>
            <p>
                <IonButton routerLink={HomeRoutes.CONTACT_US}>
                    Subscribe
                </IonButton>
            </p>
          </IonCol>
        </IonRow>
      </IonGrid>
    </section>
  );
};
