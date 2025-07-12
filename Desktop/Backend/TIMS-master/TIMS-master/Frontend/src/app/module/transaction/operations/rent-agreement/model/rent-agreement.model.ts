export interface IRentAgreement {
    id?: number;
    financialYear?: string;
    supplierName?: string;
    status?: string;
    agreementFromDate?: string;
    agreementToDate?: string;
    rentType?: string;
    areaSqft?: number;
    noticePeriod?: string;
    lockingPeriod?: string;
    monthlyRentAmount?: number;
    advanceAmount?: number;
    securityDeposit?: number;
    tdsPercentage?: number;
    gstPercentage?: number;
    rcm?: string;
    electricityUnitRate?: number;
    panNo?: string;
    gstNo?: string;
    address?: string;
    agreementNumber?: string;
    createdDate?: Date;
    createdBy?: string;
    updatedDate?: Date;
    updatedBy?: string;
}

export interface IRentAgreementSearch {
    agreementNumber?: string;
    rentType?: string;
    agreementFromDate?: string;
}

export class RentAgreement implements IRentAgreement {
    constructor(
        public id?: number,
        public financialYear?: string,
        public supplierName?: string,
        public status?: string,
        public agreementFromDate?: string,
        public agreementToDate?: string,
        public rentType?: string,
        public areaSqft?: number,
        public noticePeriod?: string,
        public lockingPeriod?: string,
        public monthlyRentAmount?: number,
        public advanceAmount?: number,
        public securityDeposit?: number,
        public tdsPercentage?: number,
        public gstPercentage?: number,
        public rcm?: string,
        public electricityUnitRate?: number,
        public panNo?: string,
        public gstNo?: string,
        public address?: string,
        public agreementNumber?: string,
        public createdDate?: Date,
        public createdBy?: string,
        public updatedDate?: Date,
        public updatedBy?: string
    ) {}
}

export class RentAgreementSearch implements IRentAgreementSearch {
    constructor(
        public agreementNumber?: string,
        public rentType?: string,
        public agreementFromDate?: string
    ) {}
}
