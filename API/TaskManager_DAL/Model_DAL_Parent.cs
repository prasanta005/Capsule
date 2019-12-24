using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManager.DAL
{
    [Table("Parent", Schema = "dbo")]
    public class Model_Parent
    {
        [Key]
        public int ParentID { get; set; }

        public string ParentTaskName { get; set; }
        

    }
}
