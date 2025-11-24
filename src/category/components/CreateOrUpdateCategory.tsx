import { IonButton, IonCard, IonCardContent, IonCardHeader, IonInput, IonItem, IonList, IonTextarea, useIonRouter } from "@ionic/react";
import { useAsyncHelpersContext } from "../../shared/contexts/async-helpers";
import { ICategory } from "../interfaces/category";
import { RefObject, useRef, useState } from "react";
import { IFileAndObjectUrl } from "../../file/components/MultipleFiles";
import { uploadFiles } from "../../file/utils/filehooks";
import { APIBaseURL, postData } from "../../shared/api/base";
import { SingleFile } from "../../file/components/SingleFile";

export interface ICreateOrUpdateCategoryProps {
    category?: ICategory;
    onCompletion?: () => void;
}

export const CreateOrUpdateCategory = ({category, onCompletion}: ICreateOrUpdateCategoryProps) => {
    const {setLoading, handleAsyncError} = useAsyncHelpersContext();
    const router = useIonRouter();
    const [categoryDto, setCategoryDto] = useState<ICategory>(category || {} as ICategory);
    const [selectedFile, setSelectedFile] = useState<IFileAndObjectUrl | null>(null);
    const fileInputRef = useRef<HTMLInputElement>();

    const saveCategory = async () => {
        try{
            setLoading({isLoading: true, loadingMessage: "saving category"});
            if(selectedFile) {
                const fileRes = await uploadFiles([selectedFile]);
                if(fileRes?.length) categoryDto.avatar = fileRes[0].attachmentUrl;
            }
            
            if(category?.id) {
                await postData(`${APIBaseURL}/category/${category.id}`, {
                method: "put",
                ...categoryDto
            });
            }
            else {
                await postData(`${APIBaseURL}/category`, {
                method: "post",
                ...categoryDto
            });
            }
            setLoading({isLoading: false, loadingMessage: ""})
            if(onCompletion) onCompletion();
        }catch(error){
            handleAsyncError(error, "Error saving category");
        }
    }
    return (
        <div>
            <IonCard>
                <IonCardHeader>
                    <h2>{category?.name || "Create Category"}</h2>
                </IonCardHeader>
                <IonCardContent>
                    <IonList>
                        <IonItem>
                            <IonInput
                            type="text"
                            label="Name"
                            labelPlacement="stacked"
                            placeholder="Category Name"
                            value={categoryDto.name}
                            onIonInput={(evt) => {
                                setCategoryDto({...categoryDto, name: (evt.detail.value as string)})
                            }}
                            />
                        </IonItem>
                        <IonItem>
                            <IonTextarea
                            label="Description"
                            labelPlacement="stacked"
                            placeholder="Brief Description"
                            value={categoryDto.description}
                            onIonInput={(evt) => {
                                setCategoryDto({...categoryDto, description: (evt.detail.value as string)})
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
                            <IonButton expand="full" onClick={saveCategory}>Save</IonButton>

                        </div>
                    </IonList>
                </IonCardContent>
            </IonCard>
        </div>
    )
}