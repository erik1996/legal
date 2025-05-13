import { QuestionOption } from '../entities/question-option.entity';
import { Question } from '../entities/question.entity';
import { AppDataSource } from '../lib/data-source';

const metadataSeed = [
  {
    title: 'Jurisdiction',
    options: [
      'National Law',
      'Regional / State Law',
      'Municipal / Local Law',
      'EU / EEA Law',
      'International Law / Treaty-Based Law',
      'Not Jurisdiction-Specific',
    ],
  },
  {
    title: 'Legal Area',
    options: [
      'Family Law',
      'Property / Real Estate Law',
      'Employment / Labour Law',
      'Company / Corporate Law',
      'Contract Law',
      'Criminal Law',
      'Immigration / Residency Law',
      'Personal Injury / Compensation Law',
      'Intellectual Property Law',
      'Consumer Protection Law',
      'Taxation Law',
      'Wills / Inheritance / Estate Planning',
      'Bankruptcy / Insolvency Law',
      'Civil Rights / Human Rights',
      'Administrative Law',
      'Insurance Law',
      'Healthcare / Medical Law',
      'Environmental Law',
      'Education Law',
      'Technology / Data Protection (e.g., GDPR)',
      'Public International Law (for cross-border cases)',
      'Other',
    ],
  },
  {
    title: 'Question Type',
    options: [
      'Requesting factual information',
      'Understanding legal rights or obligations',
      'Analyzing a specific scenario',
      'Understanding a legal document',
      'Finding legal resources',
      'Procedural question (how to file/submit/apply)',
      'Legal deadline question',
      'Comparing legal options',
      'Verifying the legality of an action',
    ],
  },
  {
    title: 'User’s Role in the Situation',
    options: [
      'Individual / Consumer',
      'Employee / Worker',
      'Employer / Company Representative',
      'Landlord',
      'Tenant',
      'Family Member',
      'Student',
      'Healthcare Patient',
      'Professional (e.g., doctor, architect)',
      'Creditor',
      'Debtor',
      'Victim of harm or rights violation',
      'Accused / Defendant',
      'Contractor / Freelancer',
      'Government Official / Public Authority (Europe-specific cases)',
      'NGO / Civil Society Representative',
      'Other',
    ],
  },
  {
    title: 'Urgency / Timeline',
    options: [
      'Immediate (less than 7 days)',
      'Short-term (within 30 days)',
      'Medium-term (1–6 months)',
      'Long-term (future planning)',
      'Past issue (already occurred)',
      'Ongoing issue',
    ],
  },
  {
    title: 'Question Complexity',
    options: [
      'Basic information request',
      'Scenario requiring analysis',
      'Complex situation with multiple factors',
    ],
  },
  {
    title: 'Document Type (if applicable)',
    options: [
      'Contract / Agreement',
      'Court Order / Filing',
      'Government Form / Permit',
      'Immigration Document (Visa, Residency, etc.)',
      'Letter / Email / Correspondence',
      'Inheritance / Will Document',
      'Lease / Rental Agreement',
      'Employment Contract',
      'Insurance Policy',
      'Privacy Policy / Terms of Use',
      'Power of Attorney',
      'Title Deed / Property Record',
      'Affidavit / Sworn Statement',
      'Corporate Policy / Regulation',
      'Other Legal Document',
      'Not Document-Related',
    ],
  },
  {
    title: 'Stage of Legal Process',
    options: [
      'Research / Pre-consultation',
      'Document preparation',
      'Application / Filing',
      'Investigation / Discovery',
      'Negotiation / Settlement talks',
      'Trial / Hearing preparation',
      'Awaiting authority decision',
      'Appeal / Post-decision',
      'Enforcement or compliance stage',
      'Not in formal legal process',
    ],
  },
  {
    title: 'Financial Impact Range',
    options: [
      'Minimal (under €1,000 / equivalent)',
      'Moderate (€1,000–€10,000)',
      'Significant (€10,000–€100,000)',
      'Major (over €100,000)',
      'Non-financial matter',
      'Prefer not to specify',
    ],
  },
  {
    title: 'Goal of Query',
    options: [
      'Understanding legal options',
      'Planning next steps',
      'Evaluating legal risk',
      'Understanding legal consequences',
      'Accessing resources or legal aid',
      'Learning / Educational purposes',
      'Confirming previous advice',
      'Preparing a legal document',
      'Responding to legal threat or notice',
      'Initiating legal proceedings',
      'Assessing enforceability',
      'Seeking legal representation',
    ],
  },
  {
    title: 'Parties Involved',
    options: [
      'Individual vs Individual',
      'Individual vs Business',
      'Individual vs Public Authority / Government',
      'Business vs Business',
      'Business vs Government',
      'Employer vs Employee',
      'Landlord vs Tenant',
      'Family Dispute',
      'Buyer vs Seller',
      'Creditor vs Debtor',
      'NGO vs Government (e.g., for advocacy-related queries)',
      'Other',
    ],
  },
];

export async function seedQuestion() {
  console.log('👉 Seeding Question and Answer...');
  await AppDataSource.initialize();

  for (const [index, item] of metadataSeed.entries()) {
    const existing = await AppDataSource.getRepository(Question).findOneBy({
      question: item.title,
    });

    if (!existing) {
      const question = await AppDataSource.getRepository(Question).save({
        question: item.title,
        priority: index + 1,
      });

      const options = item.options.map((label) => ({
        option: label,
        questionId: question.id,
      }));

      await AppDataSource.getRepository(QuestionOption).save(options);
    }
  }

  console.log('✅ Question and Answer seeded successfully');
}
