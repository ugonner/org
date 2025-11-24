import { RefObject, useRef, useState } from "react";
import { useAsyncHelpersContext } from "../../shared/contexts/async-helpers";
import { useIInitContextStore } from "../../shared/contexts/InitContextProvider";
import { IPost, PostDTO } from "../interfaces/post";
import { attachSharp, checkmark, fileTraySharp, shapesSharp } from "ionicons/icons";
import {
  IonButton,
  IonCol,
  IonGrid,
  IonImg,
  IonInput,
  IonItem,
  IonRow,
  IonTextarea,
  useIonRouter,
} from "@ionic/react";
import {
  IFileAndObjectUrl,
  MultipleFiles,
} from "../../file/components/MultipleFiles";
import { SingleFile } from "../../file/components/SingleFile";
import { DisplayMediaFile } from "../../file/components/DisplayMediaFile";
import { CategoryManager } from "../../category/components/CategoryManager";
import { ISelectOption } from "../../shared/components/form/MultiSelector";
import { IAttachment } from "../../shared/interfaces/typings";
import { FocalAreaManager } from "../../focalarea/components/FocalAreaManager";
import { ClusterSelector } from "../../user/components/cluster/ClusterSelector";
import { PostCard } from "./PostCard";
import { uploadFiles } from "../../file/utils/filehooks";
import { APIBaseURL, postData } from "../../shared/api/base";
import { PostRoutes } from "../enums/route";
import { IApiResponse } from "../../shared/interfaces/api-response";
import { TagManager } from "./TagManager";

export const defaultPostImageUrl = "/favicon.png";

export interface ICreateOrUpdatePostProps {
  post?: IPost;
  onCompletion: () => void;
}

export const CreateOrUpdatePost = ({
  post,
  onCompletion,
}: ICreateOrUpdatePostProps) => {
  const { setLoading, handleAsyncError } = useAsyncHelpersContext();
  const router = useIonRouter();

  const [postDto, setPostDto] = useState<PostDTO>(
    (post || {}) as unknown as PostDTO
  );
  const postPreviewRef = useRef<IPost>(post || ({} as unknown as IPost));
  const [selectedMediaFiles, setSelectedMediaFiles] = useState<
    IFileAndObjectUrl[]
  >([]);
  const mediaFileInputRef = useRef<HTMLInputElement>();
  const [selectedAvatarFile, setSelectedAvatarFile] =
    useState<IFileAndObjectUrl | null>(null);
  const avatarFileInputRef = useRef<HTMLInputElement>();

  const [pageNumber, setPageNumber] = useState(1);
  const pageTabs: { tabNumber: number; label: string; icon?: string }[] = [
    { tabNumber: 1, label: "Post Detail", icon: fileTraySharp },
    { tabNumber: 2, label: "Post Attachments", icon: attachSharp },
    { tabNumber: 3, label: "Post Categorizatioin", icon: shapesSharp },
    {tabNumber: 4, label: "Post Review", icon: checkmark }
  ];

  const deleteFile = async (mediaFile: IAttachment) => {
    try{
        setLoading({isLoading: true, loadingMessage: "Deleting post media file"});
        await postData(`${APIBaseURL}/post/${post?.id}/file`, {
            method: "delete",
            mediaFileUrl: [mediaFile?.attachmentUrl]
        });
        setPostDto({...postDto, mediaFiles: postDto.mediaFiles?.filter((pFile) => pFile.attachmentUrl !== mediaFile.attachmentUrl)})
        setLoading({isLoading: false, loadingMessage: ""})
    }catch(error){
        handleAsyncError(error, "Error deleting post media file")
    }
  };
  const savePost = async () => {
    try {
      if (!postDto.title?.trim()) throw new Error("Title is required");
      if (!postDto.avatar && !selectedAvatarFile?.file)
        throw new Error("post image is required");

      setLoading({ isLoading: true, loadingMessage: "saving post" });

      if (selectedAvatarFile) {
        const res = await uploadFiles([selectedAvatarFile]);
        if (res) postDto.avatar = res[0].attachmentUrl;
      }
      if (selectedMediaFiles.length) {
        const res = await uploadFiles(selectedMediaFiles);
        if (res) postDto.mediaFiles = [...(postDto.mediaFiles || []), ...res];
      }
      let res: IApiResponse<IPost>;
      if (post) {
        res = await postData(`${APIBaseURL}/post/${post.id}`, {
          method: "put",
          ...postDto,
        });
      } else {
        res = await postData(`${APIBaseURL}/post`, {
          method: "post",
          ...postDto,
        });
      }

      setLoading({ isLoading: false, loadingMessage: "" });
      if (onCompletion) onCompletion();
      else router.push(`${PostRoutes.VIEW_POST}?pi=${res?.data?.id}`);
    } catch (error) {
      handleAsyncError(error, "Error saving post");
    }
  };
  return (
    <IonGrid>
      {pageNumber === 1 && (
        <IonRow>
          <IonCol size="12">
            <IonItem>
              <IonInput
                type="text"
                label="Post title"
                labelPlacement="stacked"
                placeholder="Post title"
                value={postDto.title}
                onIonInput={(evt) => {
                  setPostDto({ ...postDto, title: evt.detail.value as string });
                }}
              />
            </IonItem>
            <IonItem>
              <IonTextarea
                label="Detail"
                labelPlacement="stacked"
                dangerouslySetInnerHTML={{ __html: postDto.detail || "" }}
                value={postDto.detail}
                onIonInput={(evt) => {
                  setPostDto({
                    ...postDto,
                    detail: evt.detail.value as string,
                  });
                }}
              />
            </IonItem>
          </IonCol>
        </IonRow>
      )}
      {pageNumber === 2 && (
        <>
          <IonRow>
            <IonCol size="4">
              <SingleFile
                selectedSingleFile={selectedAvatarFile}
                setSelectedSingleFile={setSelectedAvatarFile}
                fileInputRef={avatarFileInputRef as RefObject<HTMLInputElement>}
              />
            </IonCol>
            <IonCol size="3">
              <IonItem>
                <IonImg
                  src={postDto.avatar || defaultPostImageUrl}
                  alt="post"
                />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="4">
              <MultipleFiles
                selectedFiles={selectedMediaFiles}
                setSelectedFiles={setSelectedMediaFiles}
                fileInputAccept="*"
                hideSubmitButton={true}
                submitButtonText="Add Additional Files"
                fileInputId="post-media-files"
                selectMultipleFiles={(evt) => {
                  const fileObjs: IFileAndObjectUrl[] = [];
                  for (let file of evt.target.files || []) {
                    const fileObj: IFileAndObjectUrl = {
                      file,
                      objectUrl: URL.createObjectURL(file),
                    };
                    fileObjs.push(fileObj);
                  }
                  setSelectedMediaFiles([...selectedMediaFiles, ...fileObjs]);
                }}
                deleteFile={(fileObj) => {
                  setSelectedMediaFiles(
                    selectedMediaFiles.filter(
                      (f) => f.objectUrl !== fileObj.objectUrl
                    )
                  );
                }}
              />
            </IonCol>
            <IonCol size="8">
              <div style={{ display: "flex" }}>
                {postDto.mediaFiles?.map((mediaFile, index) => (
                  <div key={index}>
                    <IonButton
                      expand="full"
                      fill="clear"
                      onClick={() => deleteFile(mediaFile)}
                    >
                      Delete
                    </IonButton>

                    <DisplayMediaFile
                      key={index}
                      mediaFile={mediaFile}
                      label="post's additional file"
                    />
                  </div>
                ))}
              </div>
            </IonCol>
          </IonRow>
        </>
      )}

      {pageNumber === 3 && (
        <IonRow>
          <IonCol size="12">
            <CategoryManager
              initCategorys={
                post?.postCategories?.map(
                  (postCat) =>
                    ({
                      value: postCat.category?.id,
                      name: postCat.category?.name,
                    } as ISelectOption)
                ) || []
              }
              onCompletion={(categories) => {
                postPreviewRef.current.postCategories = categories.map(
                  (category) => ({
                    post: { id: post?.id, title: post?.title } as IPost,
                    category,
                  })
                );
                setPostDto({
                  ...postDto,
                  categoryIds: categories.map(
                    (category) => category.id as number
                  ),
                });
              }}
              label="Post Categories"
            />
          </IonCol>
          <IonCol size="12">
            <FocalAreaManager
              initFocalAreas={
                post?.postFocalAreas?.map(
                  (postCat) =>
                    ({
                      value: postCat.focalArea?.id,
                      name: postCat.focalArea?.name,
                    } as ISelectOption)
                ) || []
              }
              onCompletion={(focalAreas) => {
                postPreviewRef.current.postFocalAreas = focalAreas.map(
                  (focalArea) => ({
                    post: { id: post?.id, title: post?.title } as IPost,
                    focalArea,
                  })
                );
                setPostDto({
                  ...postDto,
                  focalAreaIds: focalAreas.map(
                    (focalArea) => focalArea.id as number
                  ),
                });
              }}
              label="Post Thematic Areas"
            />
          </IonCol>
          <IonCol size="12">
            <ClusterSelector
              initClusters={
                post?.postClusters?.map(
                  (postCat) =>
                    ({
                      value: postCat.cluster?.id,
                      name: postCat.cluster?.name,
                    } as ISelectOption)
                ) || []
              }
              onSelection={(clusters) => {
                postPreviewRef.current.postClusters = clusters.map(
                  (cluster) => ({
                    post: { id: post?.id, title: post?.title } as IPost,
                    cluster,
                  })
                );
                setPostDto({
                  ...postDto,
                  clusterIds: clusters.map((cluster) => cluster.id as number),
                });
              }}
              label="Post Clusters"
            />
          </IonCol>
           <IonCol size="12">
            <TagManager
              initTags={
                post?.postTags?.map(
                  (postCat) =>
                    ({
                      value: postCat.tag?.id,
                      name: postCat.tag?.name,
                    } as ISelectOption)
                ) || []
              }
              onCompletion={(tags) => {
                postPreviewRef.current.postTags = tags.map(
                  (tag) => ({
                    post: { id: post?.id, title: post?.title } as IPost,
                    tag,
                  })
                );
                setPostDto({
                  ...postDto,
                  tags,
                });
              }}
              label="Post Tags"
            />
          </IonCol>
        </IonRow>
      )}
      {pageNumber === 4 && (
        <IonRow>
          <IonCol size="12">
            <PostCard post={postPreviewRef.current} />
          </IonCol>
          <IonCol size="12">
            <IonButton expand="full" onClick={savePost}>
              Save Post
            </IonButton>
          </IonCol>
        </IonRow>
      )}
      <IonRow>
        <IonCol size="12">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {pageTabs[pageNumber - 2] && (
              <div>
                <IonButton
                  fill="clear"
                  onClick={() => setPageNumber(pageNumber - 1)}
                >
                  Back to {pageTabs[pageNumber - 2]?.label}
                </IonButton>
              </div>
            )}
            {pageTabs[pageNumber - 1] && (
              <div>
                <IonButton
                  fill="clear"
                  onClick={() => {
                    if (/review/i.test(pageTabs[pageNumber + 1]?.label || "")) {
                      postPreviewRef.current = {
                        ...postPreviewRef.current,
                        ...postDto,
                      };
                      postPreviewRef.current.avatar =
                        selectedAvatarFile?.objectUrl || postDto.avatar;
                      postPreviewRef.current.mediaFiles = [
                        ...(postDto.mediaFiles || []),
                        ...(selectedMediaFiles.map((mediaFile) => ({
                          attachmentType: mediaFile.file?.type,
                          attachmentUrl: mediaFile.objectUrl,
                        })) as IAttachment[]),
                      ];
                    }
                    setPageNumber(pageNumber + 1);
                  }}
                >
                  Next to {pageTabs[pageNumber]?.label}
                </IonButton>
              </div>
            )}
          </div>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};
