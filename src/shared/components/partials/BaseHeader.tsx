import {
  IonAvatar,
  IonButton,
  IonHeader,
  IonIcon,
} from "@ionic/react";
import { menuSharp, notificationsSharp } from "ionicons/icons";
import { useState } from "react";
import SideMenu from "../menus/SideMenu";

export interface IHeaderProps {
  title: string;
}

export const BaseHeader2 = ({title}: IHeaderProps) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  return (
    <IonHeader>
      
    </IonHeader>
  )
}
export const BaseHeader = ({ title }: IHeaderProps) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <IonHeader>
      <div
      className="orgheader"
      style={{
        position: "relative",
        height: "40px",
      }}
    >
      <div 
      className="org-header-band ion-padding"
      style={{
        position: "absolute",
        top: "20%",
        width: "100%",
        display: "flex",
        flexDirection: "row-reverse",
        backgroundColor: "black",
          border: "4px solid black"
      }}
      >
        <div>
          
          <SideMenu
            isOpen={openSideMenu}
            onClose={() => setOpenSideMenu(false)}
          />
        </div>
         <div>
           <span className="ion-margin-horizontal">
             <IonIcon 
            role="button"
            aria-haspopup={openSideMenu}
            aria-expanded={openSideMenu}
            onClick={() => setOpenSideMenu(!openSideMenu)}
            icon={menuSharp} 
            />
           </span>
          
         </div>
         <div>
          <span style={{marginTop: 0}}>{title}</span>
         </div>
      </div>
      <div
        style={{
          fontFamily: "cursive",
          textAlign: "center",
          backgroundColor: "black",
          color: "white",
          position: "absolute",
          top: "0",
          left: "10%",
          width: "80px",
          height: "100px",
          zIndex: 1,
          border: "5px solid black"
          
        }}
      >
        <img
          style={{ width: "100%", maxHeight: "100%", borderRadius: "30%" }}
          src="favicon.png"
          alt="logo"
        />
        <span className="ion-text-bold">ADDCR</span>
      </div>
    </div>

    </IonHeader>  
  );
};
