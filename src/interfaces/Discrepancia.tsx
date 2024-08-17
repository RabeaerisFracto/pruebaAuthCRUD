import IData from './IData';

export default interface Discrepancia {
  RecepciónCarozo: IData;
  folio: string;
  discrepancia: string;
  user_name: string;
  Bins: number;
}