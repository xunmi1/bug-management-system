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
CREATE TABLE dbo.project
	(
	id char(10) NOT NULL,
	title nchar(20) NOT NULL,
	share bit NOT NULL,
	projectDesc ntext NULL,
	imgName nchar(10) NULL,
	status tinyint NOT NULL
	)  ON [PRIMARY]
	 TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE dbo.project SET (LOCK_ESCALATION = TABLE)
GO
COMMIT
select Has_Perms_By_Name(N'dbo.project', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.project', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.project', 'Object', 'CONTROL') as Contr_Per 