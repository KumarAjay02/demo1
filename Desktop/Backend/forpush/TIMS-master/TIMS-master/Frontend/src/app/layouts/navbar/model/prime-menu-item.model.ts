export interface IPrimeMenuItem {
  label?: string;
  icon?: string;
  items?: IPrimeMenuItem[];
  command?: (event?: any) => void;
  routerLink?: string;
}
export class PrimeMenuItem implements IPrimeMenuItem {
  constructor(
    public  label?: string,
    public  icon?: string,
    public  items?: IPrimeMenuItem[],
    public  command?: (event?: any) => void,
    public  routerLink?: string,
  ) {
  }
}
