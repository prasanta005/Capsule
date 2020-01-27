using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManager.DAL
{
    [Table("Project", Schema = "dbo")]
    public class Model_Project
    {
        [Key]
        public int ProjectID { get; set; }

        public int? UserID { get; set; }
        [ForeignKey("UserID")]

        public Model_User User { get; set; }

        //public int? TaskID { get; set; }
        //[ForeignKey("TaskID")]

        //public Model_Task Task { get; set; }
        
        public string ProjectName { get; set; }
       
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int Priority { get; set; }
        
    }
}
