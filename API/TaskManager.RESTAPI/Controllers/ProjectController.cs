 using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using TaskManager.DAL;
using TaskManager.DAL.DataContext;

namespace TaskManager.RESTAPI.Controllers
{
    public class ProjectController : ApiController
    {
        private TaskManagerDataContext db = new TaskManagerDataContext();

        // GET: api/Project
        public IQueryable<Model_Project> GetModel_Project()
        {
            return db.Model_Project;
        }

        // GET: api/Project/5
        [ResponseType(typeof(Model_Project))]
        public IHttpActionResult GetModel_Project(int id)
        {
            Model_Project model_Project = db.Model_Project.Find(id);
            if (model_Project == null)
            {
                return NotFound();
            }

            return Ok(model_Project);
        }

        // PUT: api/Project/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutModel_Project(int id, Model_Project model_Project)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != model_Project.ProjectID)
            {
                return BadRequest();
            }

            db.Entry(model_Project).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Model_ProjectExists(id))
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

        // POST: api/Project
        [ResponseType(typeof(Model_Project))]
        public IHttpActionResult PostModel_Project(Model_Project model_Project)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Model_Project.Add(model_Project);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = model_Project.ProjectID }, model_Project);
        }

        // DELETE: api/Project/5
        [ResponseType(typeof(Model_Project))]
        public IHttpActionResult DeleteModel_Project(int id)
        {
            Model_Project model_Project = db.Model_Project.Find(id);
            if (model_Project == null)
            {
                return NotFound();
            }

            db.Model_Project.Remove(model_Project);
            db.SaveChanges();

            return Ok(model_Project);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Model_ProjectExists(int id)
        {
            return db.Model_Project.Count(e => e.ProjectID == id) > 0;
        }
    }
}