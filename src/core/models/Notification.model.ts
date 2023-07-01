import { User } from "./user.model";

export interface Notifications {
    id: string;
    type: string;
    notifiable_type: string;
    notifiable_id: number;
    data: {
      id: string;
      ad?: string;
      message?: string;
      messageId?: string;
      senderId?: string;
      ad_id?: string;
      user_id?: string;
      title?: string;
      status?: string | number;
      receiver: User;
      sender: User;
      url: string;
    };
    read_at: string;
    created_at: string;
    updated_at: string;
  }