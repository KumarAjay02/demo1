export interface ICitySearch {
  cityName?: string;
  cityCode?: string;
  state?:string;
  fileType?: string;

}

export class CitySearch implements ICitySearch {
  constructor(
    public cityName?: string,
    public cityCode?: string,
    public state?: string,
    public fileType?: string,
  ) {}

}
