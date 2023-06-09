import type { PbAuthRecordProps } from "./PbProps.type";

export interface Student extends PbAuthRecordProps{
  id: string;
  nickname: string;
  full_name: string;
  ssc_batch: number;
}
