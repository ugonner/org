// src/pages/About.tsx
import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonImg,
  IonIcon,
} from "@ionic/react";
import { BaseHeader } from "../../shared/components/partials/BaseHeader";
import { BaseFooter } from "../../shared/components/partials/BaseFooter";
import { compassSharp } from "ionicons/icons";

export const objectives: string[] = [
    
"To design most innovative pluggable solution-programs to targetted disability needs; considering multi-cultural dynamics among the locals and the diaspora.",
"To explore partnerships with available support opportunities for executing designed solution-programs for disability communities. ",
"To provide transparent and accountable project management,  guidance and expertise on logistics,  oversea protocols and best practices on activities related to providing disability humanitarian services across borders.",
"To provide updated data on disability needs and demographic distributions of disability communities."

]
export default function AboutUsPage() {
  return (
    <IonPage>
      <BaseHeader title="Contact Us" />

      <IonContent className="ion-padding">
        <h1 className="ion-text-center ion-text-bold ion-margin-bottom extra-large-text">
          African Diaspora Disability Collective Representation (ADDCR)
        </h1>

        <IonGrid>
          <IonRow>
            <IonCol size="12" sizeSm="7">
              <div>
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
                  We champion homegrown innovation by supporting the creation of
                  inclusive technologies, accessible designs, community
                  rehabilitation, and disability-led entrepreneurship. Our
                  mission empowers people with disabilities to become leaders,
                  innovators, and creators rather than mere beneficiaries of
                  aid.
                </p>

                <p>
                  ADDCR also protects disability rights by fostering legal
                  representation, advocating for policy reforms, strengthening
                  advocacy movements, and training disability leaders. We
                  partner with institutions, legal experts, communities, and
                  governments to build systems where disability inclusion is a
                  shared responsibility.
                </p>

                <p>
                  Together with African communities and global partners, ADDCR
                  promotes a future where no person with a disability is
                  excluded, undervalued, or unheard.
                </p>
              </div>
            </IonCol>
            <IonCol size="12" sizeSm="5">
              <div>
                <IonItem>
                  <IonImg src={"/favicon.png"} alt="logo" />
                </IonItem>
              </div>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12" sizeSm="7">
               <div>
                <p className="ion-text-danger ion-text-uppercase">Objectives</p>
               </div>
                <div 
                className="ion-margin ion-padding"
                style={{
                    borderLeft: "4px solid white"
                }}
                >
                    {
                        objectives.map((obj, index) => (
                            <div 
                            key={index}
                            style={{
                                display: "flex"
                            }}>
                                <div className="ion-text-center">
                                    <IonIcon size="large" icon={compassSharp} />
                                    
                                </div>
                                <div style={{marginLeft: "5px"}}>
                                    <p>{obj}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </IonCol>
            <IonCol size="12" sizeSm="5">
              <div>
                <p className="ion-text-uppercase ion-text-danger">
                  <span>Vision and Mission</span>
                  <h6 className="ion-text-capitalize">
                    Here is the vision and mission statements guiding our
                    operations and policies
                  </h6>
                </p>
                <p>
                  VISION:
                  <br />A synergized system where ready diaspora supports
                  efficiently meets the changing disability needs in the
                  volatile socio-economic realities in Africa.
                </p>
                <p>
                  MISSION: <br />
                  Providing trusted and co-ordinated bridge for diaspora
                  humanitarian support for the disability community, providing
                  updated and veritable disability data and most innovative
                  programs / approaches towards the evident needs based on
                  prevailing realities, laws, conventions and best practices.
                </p>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
        <BaseFooter />
      </IonContent>
    </IonPage>
  );
}
