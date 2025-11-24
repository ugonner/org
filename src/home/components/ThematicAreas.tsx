import { IonIcon, isPlatform } from "@ionic/react";
import { IFocalArea } from "../../focalarea/interfaces/focalarea";
import { copyOutline } from "ionicons/icons";

export interface IThematicAreaProps {
    focalAreas: IFocalArea[];
}



export const ThematicAreas = ({focalAreas}: IThematicAreaProps) => {
    return (
        <section id="thematic-areas" className="home-sections">
            <div
            style={{
                backgroundImage: `url(/images/sidebars/side-bar-4.png)`,
                backgroundSize: "cover",
                backgroundPosition: "fixed",
                backgroundRepeat: "no-repeat",
                padding: "30px"
            }}>
                <div
                style={{
                    padding: isPlatform("desktop") ? "40px": "10px",
                    backgroundColor: "black",
                    maxWidth: `${isPlatform("desktop") ? "65%": "100%"}`
                }}>
                    <div className="ion-margin ion-padding ion-text-center">
                        <h2>Thematic Areas</h2>
                        <p>These are areas we provide great expertise and push more strength for innovative developments</p>
                    </div>
                    <div
                    style={{
                        borderLeft: "5px solid white",
                        paddingTop: 0
                    }}>
                        {
                            focalAreas.map((focalArea, index) => (
                                <div 
                                key={index}
                                style={{
                                    marginTop: 0,
                                    paddingTop: 0,
                                    marginBottom: "40px",
                                    display: "flex"
                                }}
                                className="ion-margin-horizontal"
                                >
                                    <div className="ion-text-center"><br/>
                                        <IonIcon icon={copyOutline} size="large" />
                                        <span style={{
                                            width: "5px",
                                            height: "48px",
                                            backgroundColor: "white"
                                        }}>|</span>

                                    </div>
                                    <div className="ion-margin-horizontal">
                                        <h3>{focalArea.name}</h3>
                                        <p>{focalArea.description?.substring(0, 120)}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}