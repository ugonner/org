import { IProfile } from "../../user/interfaces/user";
import { IPost } from "./post";

export interface IPostComment {
    detail: string;
    avatar: string;
    createdAt?: string;
    post?: IPost;
    profile: IProfile;

}