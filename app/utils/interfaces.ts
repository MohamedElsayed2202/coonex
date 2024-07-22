export interface ILead {
  id?: string;
  name: string;
  status: string;
  date: Date | string;
  leadSrc?: string;
  query?: string;
  propertyType?: string;
}
