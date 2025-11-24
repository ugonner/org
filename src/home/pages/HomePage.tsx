import { IonCol, IonContent, IonGrid, IonRow, isPlatform } from "@ionic/react"
import Banner from "../components/Banner"
import { MidSection } from "../components/MidSection"
import { Team } from "../components/Team"
import { ThematicAreas } from "../components/ThematicAreas"
import { About } from "../components/About"
import { Stats } from "../components/Stats"
import Partners from "../components/Partners"
import { useIInitContextStore } from "../../shared/contexts/InitContextProvider"
import { BaseFooter } from "../../shared/components/partials/BaseFooter"
import { TrainingTracks } from "../components/TrainingTracks"
import { Donate } from "../components/Donate"

export const HomePage = () => {
  const {focalAreasRef} = useIInitContextStore();

  return (
    <IonContent>
      <div style={{
        width: "100vw",
        height: isPlatform("desktop") ? "400px": "700px"
      }}
      >
        <Banner />
      </div>
      <About />
      <MidSection />
      <ThematicAreas focalAreas={focalAreasRef.current} />
      <Team profiles={[]} />
      <Stats />
      <Partners />
      <TrainingTracks />
      <Donate />

      <BaseFooter />
    </IonContent>
  )
}