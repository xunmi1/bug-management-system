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
CREATE TABLE dbo.solution
	(
	id char(10) NOT NULL,
	issueId char(10) NOT NULL,
	issueName nchar(30) NOT NULL,
	solveDesc ntext NOT NULL,
	testDesc ntext NULL,
	isClose bit NULL
	)  ON [PRIMARY]
	 TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE dbo.solution SET (LOCK_ESCALATION = TABLE)
GO
COMMIT
select Has_Perms_By_Name(N'dbo.solution', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.solution', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.solution', 'Object', 'CONTROL') as Contr_Per 