import { AlertModel } from '@/models/AlertModel';
import { ISnackbarModel } from './ISnackbarModel';
export interface IAppState {
  sidebar: {
    opened: boolean;
  };
  header: {
    title: string;
  };
  alerts: AlertModel[];
  snackbar: ISnackbarModel | null;
}
