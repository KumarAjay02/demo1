export interface IMessage {
  exist?: boolean;
  errorMessage?: string;
  type?: string;
  msg?: string;
}

export class Message implements IMessage {
  constructor(public exist?: boolean, public errorMessage?: string, public type?: string, public msg?: string) {}
}
