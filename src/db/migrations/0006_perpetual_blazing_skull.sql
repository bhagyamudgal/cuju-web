ALTER TABLE `organizations` DROP CONSTRAINT `organizations_nftProjectId_unique`;--> statement-breakpoint
ALTER TABLE `organizations` DROP CONSTRAINT `organizations_nftProjectMintAddress_unique`;--> statement-breakpoint
ALTER TABLE `organizations` DROP COLUMN `nftProjectId`;--> statement-breakpoint
ALTER TABLE `organizations` DROP COLUMN `nftProjectMintAddress`;