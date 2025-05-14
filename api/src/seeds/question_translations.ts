import { Question } from '../entities/question.entity';
import { AppDataSource } from '../lib/data-source';

const translations = [
  {
    question: 'Jurisdiction',
    question_arm: 'Իրավասություն',
    question_rus: 'Юрисдикция',
    question_ar: 'الاختصاص القضائي',
  },
  {
    question: 'Legal Area',
    question_arm: 'Իրավաբանական ոլորտ',
    question_rus: 'Правовая область',
    question_ar: 'المجال القانوني',
  },
  {
    question: 'Question Type',
    question_arm: 'Հարցի տեսակը',
    question_rus: 'Тип вопроса',
    question_ar: 'نوع السؤال',
  },
  {
    question: 'User’s Role in the Situation',
    question_arm: 'Օգտատիրոջ դերը իրավիճակում',
    question_rus: 'Роль пользователя в ситуации',
    question_ar: 'دور المستخدم في الحالة',
  },
  {
    question: 'Urgency / Timeline',
    question_arm: 'Շտապողականություն / Ժամկետ',
    question_rus: 'Срочность / Сроки',
    question_ar: 'الاستعجال / الإطار الزمني',
  },
  {
    question: 'Question Complexity',
    question_arm: 'Հարցի բարդություն',
    question_rus: 'Сложность вопроса',
    question_ar: 'تعقيد السؤال',
  },
  {
    question: 'Document Type (if applicable)',
    question_arm: 'Փաստաթղթի տեսակը (եթե առկա է)',
    question_rus: 'Тип документа (если применимо)',
    question_ar: 'نوع المستند (إن وُجد)',
  },
  {
    question: 'Stage of Legal Process',
    question_arm: 'Իրավական գործընթացի փուլ',
    question_rus: 'Стадия правового процесса',
    question_ar: 'مرحلة العملية القانونية',
  },
  {
    question: 'Financial Impact Range',
    question_arm: 'Ֆինանսական ազդեցության շրջանակ',
    question_rus: 'Диапазон финансового воздействия',
    question_ar: 'نطاق التأثير المالي',
  },
  {
    question: 'Goal of Query',
    question_arm: 'Հարցման նպատակը',
    question_rus: 'Цель запроса',
    question_ar: 'هدف الاستفسار',
  },
  {
    question: 'Parties Involved',
    question_arm: 'Ներգրավված կողմեր',
    question_rus: 'Участвующие стороны',
    question_ar: 'الأطراف المعنية',
  },
];

export async function seedQuestionTranslations() {
  console.log(
    '👉 Patching multi-language translations for questions (if missing)...',
  );
  await AppDataSource.initialize();

  const questionRepo = AppDataSource.getRepository(Question);

  for (const entry of translations) {
    const existing = await questionRepo.findOneBy({ question: entry.question });

    if (existing) {
      let updated = false;

      if (!existing.question_arm || existing.question_arm.trim() === '') {
        existing.question_arm = entry.question_arm;
        updated = true;
      }

      if (!existing.question_rus || existing.question_rus.trim() === '') {
        existing.question_rus = entry.question_rus;
        updated = true;
      }

      if (!existing.question_ara || existing.question_ara.trim() === '') {
        existing.question_ara = entry.question_ar;
        updated = true;
      }

      if (updated) {
        await questionRepo.save(existing);
        console.log(`✅ Updated: ${entry.question}`);
      } else {
        console.log(`⏩ Skipped (all translations exist): ${entry.question}`);
      }
    } else {
      console.warn(`⚠️ Not found in DB: ${entry.question}`);
    }
  }

  console.log('✅ All translations patch complete.');
}
