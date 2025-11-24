import { Browser } from "@capacitor/browser";
import { IonButton, IonCol, IonGrid, IonIcon, IonRow } from "@ionic/react";
import { folderOpen, walkSharp } from "ionicons/icons";

export interface ITrainingProgram {
  name: string;
  description: string;
  routeLink: string;
  icon: string;
}

export const trainings: ITrainingProgram[] = [
  {
    name: "Professional Ethical Disability Care Giving",
    description:
      "This program builds the capacity of trainees on the rudiments of care giving for persons with disabilities; Providing hands-on workshops with best practices and disability etiquettes",
    icon: walkSharp,
    routeLink: "",
  },
  {
    name: "Industry-based skills training and targetted placement opportunities",
    description:
      "This program provides expert skill development of trainee on industry-needed skills baed on data from rel companies and afterwards, push for a seamless intake into the target company; Helping companies comply with the disability-employment obligations of the Disability Rights Law",
    icon: folderOpen,
    routeLink: "",
  },
];

export const TrainingTracks = () => {
  return (
    <section id="training-tracks" className="home-sections">
      <div className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <p className="ion-text-uppercase ion-text-danger">
                Training Tracks
              </p>
            </IonCol>
          </IonRow>
          <IonRow>
            {trainings.map((training, index) => (
              <IonCol key={index} size="12" sizeSm="6">
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <div>
                    <h2 className="ion-text-capitalize large-text">
                      <IonIcon icon={training.icon} size="large" />
                    </h2>
                  </div>
                  <div>
                    <h2 className="ion-text-capitalize large-text">
                      <span className="ion-margin-horizontal">
                        {training.name}
                      </span>
                    </h2>
                  </div>
                </div>
                <p>{training.description}</p>
                <p>
                  <IonButton
                    onClick={() => Browser.open({ url: training.routeLink })}
                  >
                    Join Program
                  </IonButton>
                </p>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </div>
    </section>
  );
};
