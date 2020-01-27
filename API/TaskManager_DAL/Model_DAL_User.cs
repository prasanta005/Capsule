using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManager.DAL
{

    [Table("User", Schema = "dbo")]
        public class Model_User
        {
            [Key]
            public int UserID { get; set; }

            public string FirstName { get; set; }

        public string LastName { get; set; }
        public string EmployeeID { get; set; }
    }
}
