export interface ISnackbarModel {
  color: 'success' | 'info' | 'error' | string;
  text: string;
  position: 'top' | 'right' | 'bottom' | 'left';
  timeout: number;
}

export class SnackbarModel implements ISnackbarModel {
  public color: string;
  public text: string;
  public position: 'top' | 'right' | 'bottom' | 'left';
  public timeout: number;
  constructor(snackbar: {
    text: string;
    color?: string;
    timeout?: number;
    position?: 'top' | 'right' | 'bottom' | 'left';
  }) {
    this.text = snackbar.text;
    this.color = snackbar.color || '';
    this.timeout = snackbar.timeout || 6000;
    this.position = snackbar.position || 'bottom';
  }
}
