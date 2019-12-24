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
using TaskManager.DAL;
using TaskManager.DAL.DataContext;

namespace TaskManager.RESTAPI.Controllers
{
    public class Model_UserController : ApiController
    {
        private TaskManagerDataContext db = new TaskManagerDataContext();

        // GET: api/Model_User
        public IQueryable<Model_User> GetDB_User()
        {
            return db.DB_User;
        }

        // GET: api/Model_User/5
        [ResponseType(typeof(Model_User))]
        public async Task<IHttpActionResult> GetModel_User(int id)
        {
            Model_User model_User = await db.DB_User.FindAsync(id);
            if (model_User == null)
            {
                return NotFound();
            }

            return Ok(model_User);
        }

        // PUT: api/Model_User/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutModel_User(int id, Model_User model_User)
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
                await db.SaveChangesAsync();
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

        // POST: api/Model_User
        [ResponseType(typeof(Model_User))]
        public async Task<IHttpActionResult> PostModel_User(Model_User model_User)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.DB_User.Add(model_User);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = model_User.UserID }, model_User);
        }

        // DELETE: api/Model_User/5
        [ResponseType(typeof(Model_User))]
        public async Task<IHttpActionResult> DeleteModel_User(int id)
        {
            Model_User model_User = await db.DB_User.FindAsync(id);
            if (model_User == null)
            {
                return NotFound();
            }

            db.DB_User.Remove(model_User);
            await db.SaveChangesAsync();

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