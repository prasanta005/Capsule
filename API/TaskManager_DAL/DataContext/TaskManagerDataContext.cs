using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Runtime.Remoting.Contexts;
using System.Web;

namespace TaskManager.DAL.DataContext
{
    public class TaskManagerDataContext : DbContext
    {
        // You can add custom code to this file. Changes will not be overwritten.
        // 
        // If you want Entity Framework to drop and regenerate your database
        // automatically whenever you change your model schema, please use data migrations.
        // For more information refer to the documentation:
        // http://msdn.microsoft.com/en-us/data/jj591621.aspx
    
        public TaskManagerDataContext() : base("name=TaskManagerDataContext")
        {
              Database.SetInitializer<TaskManagerDataContext>(new CreateDatabaseIfNotExists<TaskManagerDataContext>());
        }

        public System.Data.Entity.DbSet<TaskManager.DAL.Model_Task> DB_Tasks { get; set; }
        public System.Data.Entity.DbSet<TaskManager.DAL.Model_User> DB_User { get; set; }

        public System.Data.Entity.DbSet<TaskManager.DAL.Model_Project> Model_Project { get; set; } 
    }
}
