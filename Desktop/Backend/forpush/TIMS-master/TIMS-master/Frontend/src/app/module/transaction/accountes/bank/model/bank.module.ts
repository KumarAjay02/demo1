export interface IBank {
  Id?: number;
  BRANCH_CODE?: string;
  BANK_NAME?: string;
  BANK_ACCOUNT_CODE?: string;
  BANK_ACCOUNT_NO?: string;
  BANK_BRANCH_NAME?: string;
  IFSC_CODE?: string;
  BANK_ADDRESS?: string;
  STATE?: string;
  CITY?: string;
  PINCODE?: string;
  COUNTRY?: string;
  BANK_PHONE1?: string;
  BANK_PHONE2?: string;
  BANK_EMAIL?: string;
  CONTACT_PERSON_NAME?: string;
  CONTACT_MOBILE?: string;
  CONTACT_EMAIL?: string;
  MANAGER_NAME?: string;
  MANAGER_MOBILE?: string;
  MANAGER_EMAIL?: string;
  OPEN_DATE?: string;
  CLOSE_DATE?: string;
  CREDIT_LIMIT?: string;
  GUARANTEE_AMOUNT?: string;
  SIGNATORY_1?: string;
  SIGNATORY_2?: string;
  SIGNATORY_3?: string;
  SIGNATORY_4?: string;
  SIGNATORY_5?: string;
  JOINT_ACCOUNT?: string;
  IsActive?: boolean;
  createdBy?: string;
  createdDate?: Date;
  modifiedBy?: string;
  modifiedDate?: Date;
}

export class Bank implements IBank {
  constructor(
    public Id?: number,
    public BRANCH_CODE?: string,
    public BANK_NAME?: string,
    public BANK_ACCOUNT_CODE?: string,
    public BANK_ACCOUNT_NO?: string,
    public BANK_BRANCH_NAME?: string,
    public IFSC_CODE?: string,
    public BANK_ADDRESS?: string,
    public STATE?: string,
    public CITY?: string,
    public PINCODE?: string,
    public COUNTRY?: string,
    public BANK_PHONE1?: string,
    public BANK_PHONE2?: string,
    public BANK_EMAIL?: string,
    public CONTACT_PERSON_NAME?: string,
    public CONTACT_MOBILE?: string,
    public CONTACT_EMAIL?: string,
    public MANAGER_NAME?: string,
    public MANAGER_MOBILE?: string,
    public MANAGER_EMAIL?: string,
    public OPEN_DATE?: string,
    public CLOSE_DATE?: string,
    public CREDIT_LIMIT?: string,
    public GUARANTEE_AMOUNT?: string,
    public SIGNATORY_1?: string,
    public SIGNATORY_2?: string,
    public SIGNATORY_3?: string,
    public SIGNATORY_4?: string,
    public SIGNATORY_5?: string,
    public JOINT_ACCOUNT?: string,
    public IsActive?: boolean,
    public createdBy?: string,
    public createdDate?: Date,
    public modifiedBy?: string,
    public modifiedDate?: Date
  ) { }
}
