import { IonButton, IonCard, IonCardContent, IonCardHeader, IonInput, IonItem, IonList, IonTextarea, useIonRouter } from "@ionic/react";
import { useAsyncHelpersContext } from "../../shared/contexts/async-helpers";

import { RefObject, useRef, useState } from "react";
import { IFileAndObjectUrl } from "../../file/components/MultipleFiles";
import { uploadFiles } from "../../file/utils/filehooks";
import { APIBaseURL, postData } from "../../shared/api/base";
import { SingleFile } from "../../file/components/SingleFile";
import { IFocalArea } from "../interfaces/focalarea";

export interface ICreateOrUpdateFocalAreaProps {
    focalArea?: IFocalArea;
    onCompletion?: () => void;
}

export const CreateOrUpdateFocalArea = ({focalArea, onCompletion}: ICreateOrUpdateFocalAreaProps) => {
    const {setLoading, handleAsyncError} = useAsyncHelpersContext();
    const router = useIonRouter();
    const [focalAreaDto, setFocalAreaDto] = useState<IFocalArea>(focalArea || {} as IFocalArea);
    const [selectedFile, setSelectedFile] = useState<IFileAndObjectUrl | null>(null);
    const fileInputRef = useRef<HTMLInputElement>();

    const saveFocalArea = async () => {
        try{
            setLoading({isLoading: true, loadingMessage: "saving focalArea"});
            if(selectedFile) {
                const fileRes = await uploadFiles([selectedFile]);
                if(fileRes?.length) focalAreaDto.avatar = fileRes[0].attachmentUrl;
            }
            
            if(focalArea?.id) {
                await postData(`${APIBaseURL}/focalArea/${focalArea.id}`, {
                method: "put",
                ...focalAreaDto
            });
            }
            else {
                await postData(`${APIBaseURL}/focalArea`, {
                method: "post",
                ...focalAreaDto
            });
            }
            setLoading({isLoading: false, loadingMessage: ""})
            if(onCompletion) onCompletion();
        }catch(error){
            handleAsyncError(error, "Error saving focalArea");
        }
    }
    return (
        <div>
            <IonCard>
                <IonCardHeader>
                    <h2>{focalArea?.name || "Create FocalArea"}</h2>
                </IonCardHeader>
                <IonCardContent>
                    <IonList>
                        <IonItem>
                            <IonInput
                            type="text"
                            label="Name"
                            labelPlacement="stacked"
                            placeholder="FocalArea Name"
                            value={focalAreaDto.name}
                            onIonInput={(evt) => {
                                setFocalAreaDto({...focalAreaDto, name: (evt.detail.value as string)})
                            }}
                            />
                        </IonItem>
                        <IonItem>
                            <IonTextarea
                            label="Description"
                            labelPlacement="stacked"
                            placeholder="Brief Description"
                            value={focalAreaDto.description}
                            onIonInput={(evt) => {
                                setFocalAreaDto({...focalAreaDto, description: (evt.detail.value as string)})
                            }}
                            />
                        </IonItem>
                        <div>
                            <SingleFile
                            selectedSingleFile={selectedFile}
                            setSelectedSingleFile={setSelectedFile}
                            fileInputRef={fileInputRef as RefObject<HTMLInputElement>}
                            />
                        </div>
                        <div>
                            <IonButton expand="full" onClick={saveFocalArea}>Save</IonButton>

                        </div>
                    </IonList>
                </IonCardContent>
            </IonCard>
        </div>
    )
}