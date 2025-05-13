import { seedQuestion } from './question';
import { seedRoles } from './role';

async function runAllSeeds() {
  await Promise.all([seedRoles(), seedQuestion()]);
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
