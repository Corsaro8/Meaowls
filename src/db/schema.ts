import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core';

export const products = sqliteTable('products', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  price: real('price').notNull(),
  weight: text('weight').notNull(),
  badge: text('badge'),
  rating: real('rating').notNull(),
  category: text('category').notNull(),
  subcategory: text('subcategory'),
  animal: text('animal').notNull(),
  age: text('age'),
  brand: text('brand').notNull(),
  breed: text('breed'),
  intolerances: text('intolerances', { mode: 'json' }).notNull(),
  tags: text('tags', { mode: 'json' }).notNull(),
  ingredients: text('ingredients').notNull(),
  benefits: text('benefits', { mode: 'json' }).notNull(),
  contraindications: text('contraindications'),
  usage: text('usage').notNull(),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const pets = sqliteTable('pets', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  petType: text('pet_type').notNull(),
  breed: text('breed').notNull(),
  weight: text('weight').notNull(),
  age: text('age').notNull(),
  movement: text('movement').notNull(),
  allergies: text('allergies', { mode: 'json' }).notNull(),
  intolerances: text('intolerances', { mode: 'json' }).notNull(),
  sensitivities: text('sensitivities'),
  clinicalHistory: text('clinical_history', { mode: 'json' }).notNull(),
  photoUrl: text('photo_url'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const petHistory = sqliteTable('pet_history', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  petId: integer('pet_id').notNull().references(() => pets.id),
  userName: text('user_name').notNull(),
  modificationType: text('modification_type').notNull(),
  oldValue: text('old_value'),
  newValue: text('new_value'),
  createdAt: text('created_at').notNull(),
});