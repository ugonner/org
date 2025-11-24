import {
  createContext,
  Dispatch,
  MutableRefObject,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { APIBaseURL, getData } from "../api/base";
import { RoleDTO } from "../../auth/dtos/role.dto";
import { ICluster } from "../../user/interfaces/cluster";
import { IQueryResult } from "../interfaces/api-response";
import { IAppSettings } from "../interfaces/app-settings";
import { useLocalStorage } from "../../utils";
import { LocalStorageEnum } from "../enums";
import { Tag } from "../../post/interfaces/post";
import { ICategory } from "../../category/interfaces/category";
import { IFocalArea } from "../../focalarea/interfaces/focalarea";

export interface IInitContext {
  tagsRef: MutableRefObject<Tag[]>;
  rolesRef: MutableRefObject<RoleDTO[]>;
  clustersRef: MutableRefObject<ICluster[]>;
  categorysRef: MutableRefObject<ICategory[]>;
  focalAreasRef: MutableRefObject<IFocalArea[]>;
  setReLoadEntities: Dispatch<SetStateAction<boolean>>;
  appSettings: IAppSettings | null;
  updateAppSettings: (
    dto: Partial<IAppSettings>,
    config: { persist: boolean; setState: boolean }
  ) => void;
}

const initContext = createContext<IInitContext>({} as IInitContext);

export const InitContextProvider = ({ children }: PropsWithChildren) => {
  const { getItem, setItem } = useLocalStorage();

  const tagsRef = useRef<Tag[]>([]);
  const [reLoadEntities, setReLoadEntities] = useState(false);
  const rolesRef = useRef<RoleDTO[]>([]);
  const clustersRef = useRef<ICluster[]>([]);
  const categorysRef = useRef<ICategory[]>([]);
  const focalAreasRef = useRef<IFocalArea[]>([]);

  const entitiesLoadCountRef = useRef<number>(0);
  const [appSettings, setAppSettings] = useState<IAppSettings | null>(
    getItem<IAppSettings>(LocalStorageEnum.APP_SETTINGS)
  );
  const getTags = async () => {
    const res = await getData<Tag[]>(`${APIBaseURL}/post/tag`);
    tagsRef.current = res;
  };
  const getCategorys = async () => {
    const res = await getData<ICategory[]>(`${APIBaseURL}/category`);

    categorysRef.current = res;
  };

  const getFocalAreas = async () => {
    const res = await getData<IFocalArea[]>(`${APIBaseURL}/focalarea`);

    focalAreasRef.current = res;
  };

  const getClusters = async () => {
    const res = await getData<ICluster[]>(`${APIBaseURL}/user/cluster`);
    clustersRef.current = res;
  };

  const getRoles = async () => {
    const res = await getData<RoleDTO[]>(`${APIBaseURL}/auth/role`);
    rolesRef.current = res;
  };

  const loadInitEntities = () => {
    getTags().catch((err) => console.log("Error getting tags", err.message));
    getRoles().catch((error) =>
      console.log("Error setting roles", (error as Error).message)
    );
    getClusters().catch((error) =>
      console.log("Error setting clusters", (error as Error).message)
    );
    getCategorys().catch((error) =>
      console.log("Error setting init category ", (error as Error).message)
    );
    getFocalAreas().catch((error) =>
      console.log("Error setting init category ", (error as Error).message)
    );
    entitiesLoadCountRef.current += entitiesLoadCountRef.current;
  };
  const updateAppSettings = (
    dto: Partial<IAppSettings>,
    config: { persist: boolean; setState: boolean }
  ) => {
    const setting = getItem<IAppSettings>(LocalStorageEnum.APP_SETTINGS);
    if (config.persist)
      setItem(LocalStorageEnum.APP_SETTINGS, {
        ...(setting || {}),
        ...dto,
      } as IAppSettings);
    if (config.setState) setAppSettings({ ...(setting || {}), ...dto });
  };

  useEffect(() => {
    loadInitEntities();
  }, [reLoadEntities]);
  if (entitiesLoadCountRef.current === 0) {
    setTimeout(() => setReLoadEntities((prev) => !prev), 1000);
  }

  const initValues: IInitContext = {
    tagsRef,
    rolesRef,
    clustersRef,
    categorysRef,
    focalAreasRef,
    setReLoadEntities,
    appSettings,
    updateAppSettings,
  };

  return (
    <initContext.Provider value={initValues}>{children}</initContext.Provider>
  );
};

export const useIInitContextStore = () => useContext<IInitContext>(initContext);
