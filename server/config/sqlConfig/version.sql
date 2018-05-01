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
CREATE TABLE dbo.version
	(
	id char(10) NOT NULL,
	sortId int NOT NULL,
	title nchar(20) NOT NULL,
	versionDesc ntext NULL,
	pid char(10) NOT NULL
	)  ON [PRIMARY]
	 TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE dbo.version SET (LOCK_ESCALATION = TABLE)
GO
COMMIT
select Has_Perms_By_Name(N'dbo.version', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.version', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.version', 'Object', 'CONTROL') as Contr_Per 