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
    public class BAL_Task : Model_Task
    {
        private TaskManagerDataContext db = new TaskManagerDataContext();
        public IQueryable<Model_Task> Get()
        {
            return db.DB_Tasks;
        }

        public IQueryable<Model_Task> Get(int id)
        {
            var model_DAL_Task = db.DB_Tasks.Find(id);
            if (model_DAL_Task == null)
            {
                return null;
            }
            else
            {
                return db.DB_Tasks.Where(Pid => Pid.TaskID == id);
            }


        }

        public void Put(Model_Task model_DAL_Task)
        {
            db.Entry(model_DAL_Task).State = EntityState.Modified;
            db.SaveChangesAsync();
        }

        public void Post(Model_Task model_DAL_Task)
        {
            db.DB_Tasks.Add(model_DAL_Task);
            db.SaveChangesAsync();
        }
        public void Delete(Model_Task model_DAL_Task)
        {
            model_DAL_Task.IsCompleted = true;
            db.Entry(model_DAL_Task).State = EntityState.Modified;
            db.SaveChangesAsync();
        }
        public bool TaskExists(int id)  
            {
            return db.DB_Tasks.Count(e => e.TaskID == id) > 0;
            }
    }



}
