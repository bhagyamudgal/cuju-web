CREATE TABLE `donations` (
	`id` varchar(26) NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`donatorWalletAddress` char(44) NOT NULL,
	`receiverWalletAddress` char(44) NOT NULL,
	`amount` float NOT NULL,
	`currency` varchar(10) DEFAULT 'SOL',
	`organizationId` varchar(26) NOT NULL,
	CONSTRAINT `donations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `organizations` (
	`id` varchar(26) NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`name` varchar(50),
	`walletAddress` char(44) NOT NULL,
	`nftProjectId` int,
	`nftProjectMintAddress` char(44),
	CONSTRAINT `organizations_id` PRIMARY KEY(`id`),
	CONSTRAINT `organizations_walletAddress_unique` UNIQUE(`walletAddress`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` varchar(26) NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`name` varchar(50),
	`walletAddress` char(44) NOT NULL,
	`role` enum('Admin','User') NOT NULL DEFAULT 'User',
	`totalAmountDonated` float DEFAULT 0,
	`nftId` int,
	`nftMintAddress` char(44),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_walletAddress_unique` UNIQUE(`walletAddress`)
);
