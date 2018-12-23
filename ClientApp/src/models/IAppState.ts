import { AlertModel } from '@/models/AlertModel';
export interface IAppState {
  sidebar: {
    opened: boolean;
  };
  alerts: AlertModel[];
  appId: string;
  appSecret: string;
}
