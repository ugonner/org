import { IonButton, IonCol, IonGrid, IonIcon, IonRow } from "@ionic/react";
import { arrowForward, helpSharp } from "ionicons/icons";
import { HomeRoutes } from "../enums/routes";

export const About = () => {
  return (
    <section id="about" className="home-sections">
      <div
        style={{
          backgroundColor: "black",
          padding: "50px",
        }}
      >
        <IonGrid>
          <IonRow>
            <IonCol size="12" sizeSm="7">
              <div>
                <h4 className="ion-text-danger ion-text-bold ion-text-uppercase">
                  What About ADDCR <IonIcon icon={helpSharp} />{" "}
                </h4>
                <p className="large-text">
                  African Diaspora Disability Collective Representative
                </p>
                <p>
                  The African Diaspora Disability Collective Representation
                  (ADDCR) exists to bridge partnerships between global
                  disability-focused organizations and disability communities
                  across Africa. We ensure that support, advocacy, funding, and
                  development programs from the diaspora directly reach persons
                  with disabilities in ways that are equitable, transparent, and
                  shaped by local realities.
                </p>
                <p>
                    <IonButton
                    routerLink={HomeRoutes.ABOUT_US}>
                        Know More <IonIcon icon={arrowForward} />
                    </IonButton>
                </p>
              </div>
            </IonCol>
            <IonCol size="12" sizeSm="5"></IonCol>
          </IonRow>
        </IonGrid>
      </div>
    </section>
  );
};
