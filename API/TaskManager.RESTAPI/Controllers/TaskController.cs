using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using TaskManager.DAL.DataContext;
using TaskManager.DAL;
using TaskManager.BAL;

namespace TaskManager.RESTAPI.Controllers
{
    public class TaskController : ApiController
    {
        private TaskManagerDataContext db = new TaskManagerDataContext();
        private BAL_Task BAL_Task = new BAL_Task();

        // GET: api/Task        
        public IHttpActionResult Get()
        {
            
            var GetResult = BAL_Task.Get();
            return Ok(GetResult);
        }

        // GET: api/Task/5
        [ResponseType(typeof(Model_Task))]
        public IHttpActionResult Get(int id)
        {
            var GetResultId = BAL_Task.Get(id);
            if (GetResultId == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(GetResultId);
            }
        }

        // PUT: api/Task/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Put(int id, Model_Task model_BAL_Task)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != model_BAL_Task.TaskID)
            {
                return BadRequest();
            }
            try
            {
                BAL_Task.Put(model_BAL_Task);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BAL_Task.TaskExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Task
        [ResponseType(typeof(Model_Task))]
        public  IHttpActionResult Post(Model_Task model_BAL_Task)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            BAL_Task.Post(model_BAL_Task);

            return CreatedAtRoute("DefaultApi", new { id = model_BAL_Task.TaskID }, model_BAL_Task);
        }

        // DELETE: api/Task/5
        [ResponseType(typeof(Model_Task))]
        public  IHttpActionResult Delete(int id)
        {
            Model_Task model_BAL_Task =  db.DB_Tasks.Find(id);            

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != model_BAL_Task.TaskID)
            {
                return BadRequest();
            }

            try
            {
                BAL_Task.Delete(model_BAL_Task);
            }
             
            catch (DbUpdateConcurrencyException)
            {
                if (!BAL_Task.TaskExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return Ok(model_BAL_Task);
        }       

       
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}