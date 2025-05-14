import { Role } from '../entities/role.entity';
import { AppDataSource } from '../lib/data-source';

const translations = [
  {
    name: 'professional',
    name_arm: 'Մասնագիտական',
    name_rus: 'Профессионал',
    name_ara: 'محترف',
  },
  {
    name: 'non-professional',
    name_arm: 'Ոչ մասնագիտական',
    name_rus: 'Непрофессионал',
    name_ara: 'غير محترف',
  },
];

export async function seedRoleTranslations() {
  console.log(
    '👉 Patching multi-language translations for roles (if missing)...',
  );

  await AppDataSource.initialize();
  const roleRepo = AppDataSource.getRepository(Role);

  for (const entry of translations) {
    const existing = await roleRepo.findOneBy({ name: entry.name });

    if (existing) {
      let updated = false;

      if (!existing.name_arm || existing.name_arm.trim() === '') {
        existing.name_arm = entry.name_arm;
        updated = true;
      }

      if (!existing.name_rus || existing.name_rus.trim() === '') {
        existing.name_rus = entry.name_rus;
        updated = true;
      }

      if (!existing.name_ara || existing.name_ara.trim() === '') {
        existing.name_ara = entry.name_ara;
        updated = true;
      }

      if (updated) {
        await roleRepo.save(existing);
        console.log(`✅ Updated: ${entry.name}`);
      } else {
        console.log(`⏩ Skipped (all translations exist): ${entry.name}`);
      }
    } else {
      console.warn(`⚠️ Not found in DB: ${entry.name}`);
    }
  }

  console.log('✅ All role translations patch complete.');
}
