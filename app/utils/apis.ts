import axios from "axios";
import { ILead } from "./interfaces";

export const getLoads = async (): Promise<ILead[]> => {
  try {
    const { data } = await axios.get("https://leads-back.vercel.app/api/v1/leads");
    const leads: ILead[] = data.record.map((record: any): ILead => {
      return {
        id: record._id,
        name: record.name,
        status: record.status,
        date: record.date,
        leadSrc: record.leadSrc,
        propertyType: record.propertyType,
        query: record.query
      };
    });
    return leads;
  } catch (e) {
    throw e;
  }
};
