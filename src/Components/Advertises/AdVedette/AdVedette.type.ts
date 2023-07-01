import { User } from "core/models/user.model";
import { Ad } from "../../../core/models/ad.model";
import { Theme } from "../../../core/enums/theme";

export interface AdVedetteProps {
    adData: Ad | undefined;
    user?:User ;
    mode: Theme;
    handleThemeChange?: () => void;
   
  }