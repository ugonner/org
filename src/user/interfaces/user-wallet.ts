import { IPosition } from "./position";
import { IProfile } from "./user";

export interface IProfilePosition {
  profile: IProfile;
  position: IPosition;
  positionNote?: string;
}

export interface IProfileWallet {
  id: number;

  fundedBalance: number;
  
  earnedBalance: number;
  
  pendingBalance: number;

  profile: IProfile;


  createdAt: Date;


  updatedAt: Date;

  
  isDeleted: boolean;
}

