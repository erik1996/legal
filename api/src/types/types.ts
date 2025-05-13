export enum Country {
  USA = 'USA',
  UK = 'UK',
  UAE = 'UAE',
  Canada = 'Canada',
  Australia = 'Australia',
  Other = 'Other',
}

export enum JurisdictionType {
  Federal = 'Federal',
  State = 'State',
  International = 'International',
  NotSpecific = 'Not jurisdiction-specific',
}

export enum LegalArea {
  FamilyLaw = 'Family Law',
  RealEstate = 'Real Estate/Property Law',
  EmploymentLaw = 'Employment Law',
  BusinessLaw = 'Business/Corporate Law',
  ContractLaw = 'Contract Law',
  CriminalLaw = 'Criminal Law',
  ImmigrationLaw = 'Immigration Law',
  PersonalInjury = 'Personal Injury',
  IntellectualProperty = 'Intellectual Property',
  ConsumerLaw = 'Consumer Law',
  TaxLaw = 'Tax Law',
  EstatePlanning = 'Estate Planning/Wills/Trusts',
  Bankruptcy = 'Bankruptcy',
  CivilRights = 'Civil Rights/Constitutional Law',
  AdministrativeLaw = 'Administrative Law',
  InsuranceLaw = 'Insurance Law',
  HealthcareLaw = 'Healthcare/Medical Law',
  EnvironmentalLaw = 'Environmental Law',
  EducationLaw = 'Education Law',
  Other = 'Other',
}

export enum QuestionType {
  FactualInformation = 'Requesting factual information',
  LegalRights = 'Understanding legal rights or obligations',
  ScenarioAnalysis = 'Analyzing a specific scenario',
  DocumentUnderstanding = 'Understanding a legal document',
  Resources = 'Finding legal resources',
  Procedural = 'Procedural question (how to file/submit/apply)',
  Deadline = 'Legal deadline question',
  ComparingOptions = 'Comparing legal options',
}

export enum UserRole {
  Individual = 'Individual/Consumer',
  Employee = 'Employee/Worker',
  Employer = 'Employer/Business Owner',
  Tenant = 'Tenant',
  Landlord = 'Landlord',
  Victim = 'Victim of crime/harm',
  Defendant = 'Accused/Defendant',
  Creditor = 'Creditor',
  Debtor = 'Debtor',
  Other = 'Other',
}

export enum Urgency {
  Immediate = 'Immediate (less than 7 days)',
  ShortTerm = 'Short-term (within 30 days)',
  MediumTerm = 'Medium-term (1-6 months)',
  LongTerm = 'Long-term (future planning)',
  PastIssue = 'Past issue (already occurred)',
}

export enum Complexity {
  Basic = 'Basic information request',
  AnalysisRequired = 'Scenario requiring analysis',
  Complex = 'Complex situation with multiple factors',
}

export enum DocumentType {
  Contract = 'Contract/Agreement',
  CourtFiling = 'Court Filing/Notice',
  GovernmentForm = 'Government Form',
  Correspondence = 'Letter/Correspondence',
  WillTrust = 'Will/Trust Document',
  LeaseRental = 'Lease/Rental Agreement',
  EmploymentDocument = 'Employment Document',
  InsurancePolicy = 'Insurance Policy',
  TermsOfService = 'Terms of Service/Privacy Policy',
  WarrantyGuarantee = 'Warranty/Guarantee',
  PowerOfAttorney = 'Power of Attorney',
  DeedTitle = 'Deed/Title',
  OtherLegal = 'Other Legal Document',
  None = 'Not Document-Related',
}

export enum StageOfProcess {
  PreFiling = 'Pre-filing research',
  DocumentPreparation = 'Document preparation',
  FilingSubmission = 'Filing/Submission stage',
  Discovery = 'Discovery/Information gathering',
  Negotiation = 'Negotiation/Settlement discussions',
  TrialPreparation = 'Hearing/Trial preparation',
  WaitingDecision = 'Waiting for response/decision',
  PostDecision = 'Post-decision/appeal stage',
  Enforcement = 'Enforcement of rights/judgment',
  None = 'Not in a formal legal process',
}

export enum FinancialImpact {
  Minimal = 'Minimal (under $1,000)',
  Moderate = 'Moderate ($1,000-$10,000)',
  Significant = 'Significant ($10,000-$100,000)',
  Major = 'Major (over $100,000)',
  NonFinancial = 'Non-financial matter',
  Unspecified = 'Prefer not to specify',
}

export enum Goal {
  UnderstandingOptions = 'Understanding my options',
  PlanningSteps = 'Planning next steps',
  EvaluatingRisk = 'Evaluating risk',
  UnderstandingConsequences = 'Understanding consequences',
  FindingResources = 'Finding the right resources',
  Educational = 'Educational purposes only',
  ConfirmingInformation = 'Confirming information from another source',
  DraftingDocument = 'Drafting a document',
  RespondingAction = 'Responding to legal action',
  InitiatingAction = 'Initiating legal action',
}

export enum PartiesInvolved {
  IndividualVsIndividual = 'Individual vs Individual',
  IndividualVsBusiness = 'Individual vs Business',
  IndividualVsGovernment = 'Individual vs Government',
  BusinessVsBusiness = 'Business vs Business',
  BusinessVsGovernment = 'Business vs Government',
  FamilyMembers = 'Family members',
  EmployerEmployee = 'Employer/Employee',
  LandlordTenant = 'Landlord/Tenant',
  BuyerSeller = 'Buyer/Seller',
  CreditorDebtor = 'Creditor/Debtor',
  Other = 'Other',
}

export type QuestionAnswerMap = {
  questionId: number;
  answerId: number;
};
