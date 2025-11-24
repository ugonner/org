import { ICategory } from "../../category/interfaces/category";
import { IFocalArea } from "../../focalarea/interfaces/focalarea";
import { IAttachment } from "../../shared/interfaces/typings";
import { ICluster } from "../../user/interfaces/cluster";
import { IProfile } from "../../user/interfaces/user";
import { IPostComment } from "./comment";

export interface Tag {
    id?: number;
    name: string;
}

export interface IPostTag {
    post: IPost;
    tag: Tag;
}

export interface IPostCluster {
    post: IPost;
    cluster: ICluster;
}

export interface IPostCategory {
  post: IPost;
  category: ICategory;
}

export interface IPostFocalArea {
  post: IPost;
  focalArea: IFocalArea;
}

export interface IPostLike {
    post: IPost;
    profile: IProfile;
}

export interface IPost {
  id: number;

  title: string;

  detail?: string;

  avatar?: string;

  mediaFiles?: IAttachment[];

  isPublished: boolean;

  dateOfPublication: string;

  noOfComments: number;
  
  noOfLikes: number;
  
  postTags: IPostTag[];
  
    profile: IProfile;

    postClusters: IPostCluster[];

    postCategories: IPostCategory[];
    
    postFocalAreas: IPostFocalArea[];

    postComments: IPostComment[];

    postLikes: IPostLike[];

  createdAt: string;

  updatedAt: string;

  isDeleted: boolean;
}

export interface PostDTO {
  id?: number;

  title: string;

  detail?: string;

  avatar?: string;

  mediaFiles: IAttachment[]


  tags: Tag[];

  clusterIds?: number[];

  categoryIds?: number[];

  focalAreaIds?: number[];
}