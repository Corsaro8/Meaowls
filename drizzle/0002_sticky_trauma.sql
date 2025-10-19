CREATE TABLE `pet_history` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`pet_id` integer NOT NULL,
	`user_name` text NOT NULL,
	`modification_type` text NOT NULL,
	`old_value` text,
	`new_value` text,
	`created_at` text NOT NULL,
	FOREIGN KEY (`pet_id`) REFERENCES `pets`(`id`) ON UPDATE no action ON DELETE no action
);
