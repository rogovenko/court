export type JuryMember = {
    name: string;
    description: string;
    vote: boolean;
  };
  
export type CaseDetails = {
    title: string;
    description: string;
  };
  
export type AccusedMember = {
  name: string;
  description: string;
  case: CaseDetails;
};

export type CourtCase = {
    accused: AccusedMember;
    jury: JuryMember[];
    isGuilty: boolean;
    failText: string;
  };