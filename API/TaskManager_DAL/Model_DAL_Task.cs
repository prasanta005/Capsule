using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManager.DAL
{
    [Table("Task", Schema="dbo")]
    public class Model_Task
    {
        [Key]
        public int TaskID { get; set; }

        public string TaskName { get; set; }

        public int? ParentID { get; set; }
        [ForeignKey("ParentID")]
        public Model_Task ParentTask { get; set; }

        public int? ProjectID { get; set; }
        [ForeignKey("ProjectID")]
        public Model_Project Project { get; set; }

        public int? UserID { get; set; }
        [ForeignKey("UserID")]
        public Model_User User { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool IsCompleted { get; set; }
        public int Priority { get; set; }
        public  string ParentTaskName
        {
            get
            {
                if (ParentTask != null)
                    return ParentTask.TaskName;
                else
                    return "This Task Has NO Parent";
            }
        }
    }


}
