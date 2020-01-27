namespace TaskManager_DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Task",
                c => new
                    {
                        TaskID = c.Int(nullable: false, identity: true),
                        TaskName = c.String(),
                        ParentID = c.Int(),
                        ProjectID = c.Int(),
                        UserID = c.Int(),
                        StartDate = c.DateTime(nullable: false),
                        EndDate = c.DateTime(nullable: false),
                        IsCompleted = c.Boolean(nullable: false),
                        Priority = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.TaskID)
                .ForeignKey("dbo.Task", t => t.ParentID)
                .ForeignKey("dbo.Project", t => t.ProjectID)
                .ForeignKey("dbo.User", t => t.UserID)
                .Index(t => t.ParentID)
                .Index(t => t.ProjectID)
                .Index(t => t.UserID);
            
            CreateTable(
                "dbo.Project",
                c => new
                    {
                        ProjectID = c.Int(nullable: false, identity: true),
                        UserID = c.Int(),
                        ProjectName = c.String(),
                        StartDate = c.DateTime(nullable: false),
                        EndDate = c.DateTime(nullable: false),
                        Priority = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ProjectID)
                .ForeignKey("dbo.User", t => t.UserID)
                .Index(t => t.UserID);
            
            CreateTable(
                "dbo.User",
                c => new
                    {
                        UserID = c.Int(nullable: false, identity: true),
                        FirstName = c.String(),
                        LastName = c.String(),
                        EmployeeID = c.String(),
                    })
                .PrimaryKey(t => t.UserID);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Task", "UserID", "dbo.User");
            DropForeignKey("dbo.Task", "ProjectID", "dbo.Project");
            DropForeignKey("dbo.Project", "UserID", "dbo.User");
            DropForeignKey("dbo.Task", "ParentID", "dbo.Task");
            DropIndex("dbo.Project", new[] { "UserID" });
            DropIndex("dbo.Task", new[] { "UserID" });
            DropIndex("dbo.Task", new[] { "ProjectID" });
            DropIndex("dbo.Task", new[] { "ParentID" });
            DropTable("dbo.User");
            DropTable("dbo.Project");
            DropTable("dbo.Task");
        }
    }
}
