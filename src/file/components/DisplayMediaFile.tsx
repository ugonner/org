import { IonImg, IonItem } from "@ionic/react";
import { IAttachment } from "../../shared/interfaces/typings";

export interface IDisplayMediaFileProps {
  mediaFile: IAttachment;
  label: string;
}
export const DisplayMediaFile = ({
  mediaFile,
  label,
}: IDisplayMediaFileProps) => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      {/image/i.test(mediaFile.attachmentType) && (
        <IonItem>
          <IonImg src={mediaFile.attachmentUrl} alt={label} />
        </IonItem>
      )}
      {/video/i.test(mediaFile.attachmentType) && (
        <video
          src={mediaFile.attachmentUrl}
          aria-label={label}
          style={{ width: "100%", height: "auto" }}
          controls
        />
      )}
      {/audio/i.test(mediaFile.attachmentType) && (
        <audio src={mediaFile.attachmentUrl} aria-label={label} controls />
      )}
      {(!/audio|video|image/.test(mediaFile.attachmentType)) && (
        <embed
          src={mediaFile.attachmentUrl}
          aria-label={label}
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      )}
    </div>
  );
};
