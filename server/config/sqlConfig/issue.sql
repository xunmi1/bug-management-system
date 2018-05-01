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
CREATE TABLE dbo.Tmp_issue
	(
	id char(10) NOT NULL,
	title nchar(30) NOT NULL,
	issueSelect nchar(10) NOT NULL,
	severity tinyint NOT NULL,
	version char(10) NOT NULL,
	project char(10) NOT NULL,
	module char(10) NULL,
	text ntext NOT NULL,
	issuer char(10) NOT NULL,
	dispense char(10) NULL,
	developer char(10) NULL,
	tester char(10) NULL,
	priority tinyint NOT NULL,
	versionEnd char(10) NULL,
	startDate datetime NOT NULL,
	endDate datetime NULL,
	status tinyint NOT NULL
	)  ON [PRIMARY]
	 TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE dbo.issue SET (LOCK_ESCALATION = TABLE)
GO
COMMIT
select Has_Perms_By_Name(N'dbo.issue', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.issue', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.issue', 'Object', 'CONTROL') as Contr_Per 