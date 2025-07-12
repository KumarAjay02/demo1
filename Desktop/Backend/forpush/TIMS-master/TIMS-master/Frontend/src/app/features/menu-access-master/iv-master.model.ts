export interface IIvMaster {
  code?: string;
  description?: string;
  errorType?: string;
  message?: string;
}

export class IvMaster implements IIvMaster {
  constructor(public code?: string, public description?: string, public errorType?: string, public message?: string) {}
}
