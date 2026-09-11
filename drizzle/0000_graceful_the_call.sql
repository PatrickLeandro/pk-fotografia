CREATE TABLE `albums` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`data` text NOT NULL,
	`published` integer DEFAULT 0 NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`version` integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `albums_slug_unique` ON `albums` (`slug`);--> statement-breakpoint
CREATE INDEX `idx_albums_published_order` ON `albums` (`published`,`sort_order`);--> statement-breakpoint
CREATE TABLE `assets` (
	`id` text PRIMARY KEY NOT NULL,
	`album_id` text,
	`caption` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`album_id`) REFERENCES `albums`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_assets_album` ON `assets` (`album_id`);--> statement-breakpoint
CREATE TABLE `settings` (
	`id` text PRIMARY KEY NOT NULL,
	`data` text NOT NULL
);
