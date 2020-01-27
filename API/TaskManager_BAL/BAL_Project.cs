using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManager.DAL.DataContext;
using TaskManager.DAL;
using System.Data.Entity;

namespace TaskManager.BAL
{
    public class BAL_Project : Model_Project
    {
        private TaskManagerDataContext db = new TaskManagerDataContext();
        public IQueryable<Model_Project> Get()
        {
            return db.Model_Project;
        }

        public IQueryable<Model_Project> Get(int id)
        {
            var model_DAL_Project = db.Model_Project.Find(id);
            if (model_DAL_Project == null)
            {
                return null;
            }
            else
            {
                return db.Model_Project.Where(Pid => Pid.ProjectID == id);
            }


        }

        public void Put(Model_Project model_DAL_Project)
        {
            db.Entry(model_DAL_Project).State = EntityState.Modified;
            db.SaveChangesAsync();
        }

        public void Post(Model_Project model_DAL_Project)
        {
            db.Model_Project.Add(model_DAL_Project);
            db.SaveChangesAsync();
        }
        public void Delete(Model_Project model_DAL_Project)
        {
            
            db.Entry(model_DAL_Project).State = EntityState.Modified;
            db.SaveChangesAsync();
        }
        public bool TaskExists(int id)
        {
            return db.Model_Project.Count(e => e.ProjectID == id) > 0;
        }
    }



}
