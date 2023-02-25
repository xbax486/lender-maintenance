import { ILender } from './lender';

export interface ILenderJsonResult {
  data: ILender[];
  links: {
    self: string;
  };
}
