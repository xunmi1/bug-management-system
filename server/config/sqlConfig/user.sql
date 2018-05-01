/*
   数据库: BugManagementSystem
*/
BEGIN TRANSACTION
SET QUOTED_IDENTIFIER ON
SET ARITHABORT ON
SET NUMERIC_ROUNDABORT OFF
SET CONCAT_NULL_YIELDS_NULL ON
SET ANSI_NULLS ON
SET ANSI_PADDING ON
SET ANSI_WARNINGS ON
COMMIT
BEGIN TRANSACTION
GO
CREATE TABLE dbo.[user]
	(
	userId char(10) NOT NULL,
	userName nchar(20) NOT NULL,
	userPwd nchar(30) NOT NULL,
	userEmail nchar(50) NOT NULL,
	userAvatar nchar(50) NULL,
	userDesc ntext NULL,
	userStatus tinyint NOT NULL
	)  ON [PRIMARY]
	 TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE dbo.[user] SET (LOCK_ESCALATION = TABLE)
GO
COMMIT
select Has_Perms_By_Name(N'dbo.[user]', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.[user]', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.[user]', 'Object', 'CONTROL') as Contr_Per 