export interface ICountrySearch {
  countryName?: string;
  countryCode?: string;
  fileType?: string;

}

export class CountrySearch implements ICountrySearch {
  constructor(
    public countryName?: string,
    public countryCode?: string,
    public fileType?: string,
  ) {}

}
