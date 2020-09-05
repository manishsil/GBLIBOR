export class Loan {
    loanContractFinancialId: number;
    contractId: number;
    counterPartyId: number;
    loanAmount: number;
    loanCurrency: string;
    startDate: string;
    maturityDate: string;
    tenorMonths: number;
    rateOfInterest: number;
    loanTypeId: number;
    collateralInfo: string;
    paymentSchedule: number;
    borrowerName: string;
    lenderName: string;
    adminAgentName: string;
    jointLeadArrangerName: string;
    coSyndicationAgentName: string;
    coDocumentationAgentName: string;
}
