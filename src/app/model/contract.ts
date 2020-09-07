export class Contract {
    id: number;
    contractId: number;
    parentContractId: string;
    documentFileName: string;
    contractName: string;
    legalEntityId: number;
    legalEntityName: string;
    counterPartyId: number;
    counterPartyName: string;
    contractTemplate: string;
    contractStartDate: string;
    contractExpiryDate: string;
    contractTypeId: number;
    contractSubTypeId: number;
    currStatusId: number;
    createdOn: string;
    createdBy: string;
    libor: true;
    amendmentDoc: false;
}
