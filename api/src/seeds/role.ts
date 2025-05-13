import { Role } from '../entities/role.entity';
import { AppDataSource } from '../lib/data-source';

export async function seedRoles() {
  console.log('👉 Seeding roles...');
  await AppDataSource.initialize();

  const roles = [
    {
      name: 'non-professional',
      systemMessage: `You are a legal assistant helping someone without legal training. Use the provided context to explain their situation in plain language. Avoid legal jargon. Focus on clarity and suggest possible legal options or next steps. Be prepared to answer follow-up questions if the user asks.`,
    },
    {
      name: 'professional',
      systemMessage: `You are a senior legal assistant helping lawyers and judges. Based on the provided context, offer legally sound, citation-backed analysis. Include relevant statutory references, leading cases, or regulations. Assume the user understands legal terminology.`,
    },
  ];

  for (const role of roles) {
    const existing = await AppDataSource.getRepository(Role).findOneBy({
      name: role.name,
    });

    if (!existing) {
      await AppDataSource.getRepository(Role).save(role);
    }
  }

  console.log('✅ Roles seeded successfully');
}
