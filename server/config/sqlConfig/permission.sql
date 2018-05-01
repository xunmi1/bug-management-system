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
CREATE TABLE dbo.permission
	(
	userId char(10) NOT NULL,
	projectId char(10) NOT NULL,
	permission char(6) NOT NULL
	)  ON [PRIMARY]
GO
ALTER TABLE dbo.permission SET (LOCK_ESCALATION = TABLE)
GO
COMMIT
select Has_Perms_By_Name(N'dbo.permission', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.permission', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.permission', 'Object', 'CONTROL') as Contr_Per 