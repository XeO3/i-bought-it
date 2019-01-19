export interface IAlertModel {
  message: string;
  icon: string;
  dismissible: boolean;
  outline: boolean;
  transition: string;
  type: AlertType;
  value: boolean;
}

export class AlertModel implements IAlertModel {
  public message: string = '';
  public icon: string = '';
  public dismissible = false;
  public outline = false;
  public transition: string = '';
  public type: AlertType = AlertType.error;
  public value = true;
}

export enum AlertType {
  success = 'success',
  info = 'info',
  warning = 'warning',
  error = 'error',
}
