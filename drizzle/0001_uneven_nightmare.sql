CREATE TABLE `pets` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`pet_type` text NOT NULL,
	`breed` text NOT NULL,
	`weight` text NOT NULL,
	`age` text NOT NULL,
	`movement` text NOT NULL,
	`allergies` text NOT NULL,
	`intolerances` text NOT NULL,
	`sensitivities` text,
	`clinical_history` text NOT NULL,
	`photo_url` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
