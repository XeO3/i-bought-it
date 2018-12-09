import { WhooingResponseModel } from './WhooingResponseModel';
export interface WhooingResponseArrayModel<T>
  extends WhooingResponseModel<T[]> {}
export class WhooingSectionModel {
  constructor(
    public section_id: string,
    public title: string,
    public memo: string,
    public currency: string,
    public isolation: string,
    public total_assets: number,
    public total_liabilities: number,
    public skin_id: number,
    public decimal_places: number,
    public date_format: string,
  ) {}
}
