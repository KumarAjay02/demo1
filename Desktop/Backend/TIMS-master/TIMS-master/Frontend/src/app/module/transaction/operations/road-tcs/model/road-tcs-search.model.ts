// model/road-tcs-search.model.ts
export interface IRoadTcsSearch {
  tcsNumber?: string;
  vehicleNumber?: string;
  driverName?: string;
  fromDate?: string;
  toDate?: string;
}

export class RoadTcsSearch implements IRoadTcsSearch {
  constructor(
    public tcsNumber?: string,
    public vehicleNumber?: string,
    public driverName?: string,
    public fromDate?: string,
    public toDate?: string
  ) {}
}
