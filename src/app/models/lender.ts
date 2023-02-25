import { ILenderAttributes } from './lender-attributes';

export interface ILender {
  type: string;
  id: string;
  attributes: ILenderAttributes;
}
