ALTER TABLE `organizations` MODIFY COLUMN `nftProjectId` int NOT NULL DEFAULT 1;--> statement-breakpoint
ALTER TABLE `organizations` MODIFY COLUMN `nftProjectMintAddress` char(44) NOT NULL DEFAULT '1';--> statement-breakpoint
ALTER TABLE `organizations` ADD CONSTRAINT `organizations_nftProjectId_unique` UNIQUE(`nftProjectId`);--> statement-breakpoint
ALTER TABLE `organizations` ADD CONSTRAINT `organizations_nftProjectMintAddress_unique` UNIQUE(`nftProjectMintAddress`);