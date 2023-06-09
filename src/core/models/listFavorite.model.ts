import { Ad } from "./ad.model";

export interface ListFav {
    id: number;
    user_id: number;
    ad_id: number;
    created_at: string;
    updated_at: string;
    ad: Ad;
  }
  export interface AdData {
    data: ListFav[];
  }