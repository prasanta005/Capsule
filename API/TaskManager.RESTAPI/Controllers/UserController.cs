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
    public class UserController : ApiController
    {
        private TaskManagerDataContext db = new TaskManagerDataContext();

        // GET: api/User
        public IQueryable<Model_User> GetDB_User()
        {
            return db.DB_User;
        }

        // GET: api/User/5
        [ResponseType(typeof(Model_User))]
        public IHttpActionResult GetModel_User(int id)
        {
            Model_User model_User = db.DB_User.Find(id);
            if (model_User == null)
            {
                return NotFound();
            }

            return Ok(model_User);
        }

        // PUT: api/User/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutModel_User(int id, Model_User model_User)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != model_User.UserID)
            {
                return BadRequest();
            }

            db.Entry(model_User).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Model_UserExists(id))
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

        // POST: api/User
        [ResponseType(typeof(Model_User))]
        public IHttpActionResult PostModel_User(Model_User model_User)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.DB_User.Add(model_User);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = model_User.UserID }, model_User);
        }

        // DELETE: api/User/5
        [ResponseType(typeof(Model_User))]
        public IHttpActionResult DeleteModel_User(int id)
        {
            Model_User model_User = db.DB_User.Find(id);
            if (model_User == null)
            {
                return NotFound();
            }

            db.DB_User.Remove(model_User);
            db.SaveChanges();

            return Ok(model_User);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Model_UserExists(int id)
        {
            return db.DB_User.Count(e => e.UserID == id) > 0;
        }
    }
}