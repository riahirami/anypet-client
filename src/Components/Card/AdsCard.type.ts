import { User } from "core/models/user.model";
import { Ad, AdData } from "../../core/models/ad.model";
import { Theme } from "../../core/enums/theme";
 
  
export interface AdCardProps {
  adData: Ad;
  user?:User ;
  mode: Theme;
  handleThemeChange: () => void;
  // medias: {
  //   data: Media[]
  // }
}


export interface Media {
  id: number
  file_name: string
  file_path: string
  mime_type: string
  mediable_type: string
  mediable_id: number
  created_at: string
  updated_at: string
}
