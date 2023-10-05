ALTER TABLE `organizations` MODIFY COLUMN `nftProjectId` int NOT NULL;--> statement-breakpoint
ALTER TABLE `organizations` MODIFY COLUMN `nftProjectMintAddress` char(44) NOT NULL;