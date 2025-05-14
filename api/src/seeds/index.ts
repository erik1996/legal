import { seedQuestionOptionsTranslations } from './option_translations';
import { seedQuestion } from './question';
import { seedQuestionTranslations } from './question_translations';
import { seedRoles } from './role';
import { seedRoleTranslations } from './role_translations';

async function runAllSeeds() {
  await Promise.all([
    seedRoles(),
    seedQuestion(),
    seedQuestionTranslations(),
    seedQuestionOptionsTranslations(),
    seedRoleTranslations(),
  ]);
}

runAllSeeds()
  .then(() => {
    console.log('✅ All seeds completed');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Seed error:', err);
    process.exit(1);
  });
