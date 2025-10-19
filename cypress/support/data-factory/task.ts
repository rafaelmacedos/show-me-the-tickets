import { faker } from '@faker-js/faker/locale/pt_BR';

export const newTask = (assigneeId: string) => ({
  title: faker.lorem.words(5),
  description: faker.lorem.paragraph(2),
  due_datetime: new Date(Date.now() + 24 * 60 * 60 * 1000),
  status: faker.helpers.arrayElement(['pending', 'in_progress', 'completed', 'cancelled', 'delayed']),
  priority: faker.helpers.arrayElement(['low', 'medium', 'high', 'urgent']),
  category: faker.helpers.arrayElement(['personal', 'work', 'family', 'health', 'finance', 'other']),
  assigneeId: assigneeId,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
});


export const updateTask = (assigneeId: string) => ({
    title: faker.lorem.words(5),
    description: faker.lorem.paragraph(3),
    due_datetime: new Date(Date.now() + 24 * 60 * 60 * 2000),
    status: faker.helpers.arrayElement(['pending', 'in_progress', 'completed', 'cancelled', 'delayed']),
    priority: faker.helpers.arrayElement(['low', 'medium', 'high', 'urgent']),
    category: faker.helpers.arrayElement(['personal', 'work', 'family', 'health', 'finance', 'other']),
    assigneeId: assigneeId,
    updated_at: new Date().toISOString(),
  });