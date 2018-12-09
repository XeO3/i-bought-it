export class AlertModel {
  constructor(
    public message: string,
    public icon: string,
    public dismissible = false,
    public outline = false,
    public transition: string,
    public type: AlertType = AlertType.error,
    public value = true,
  ) {}
}

enum AlertType {
  success = 'success',
  info = 'info',
  warning = 'warning',
  error = 'error',
}
