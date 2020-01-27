using System;
using TaskManager.RESTAPI.Controllers;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Web.Http;
using System.Web.Http.Results;

namespace TaskManager_NUnit
{
    [TestClass]
    public class NUnitTest
    {
        [TestMethod]        
        public void GetAllTasks()
        {
            TaskController allTasks = new TaskController();
            var getResult = allTasks.Get();
            Assert.IsNotNull(getResult);

        }
        [TestMethod]
        public void GetAllUsers()
        {
            UserController allUsers = new UserController();
            var getResult = allUsers.GetDB_User();
            Assert.IsNotNull(getResult);

        }
        [TestMethod]
        public void GetAllProjects()
        {
            ProjectController allProjects = new ProjectController();
            var getResult = allProjects.GetModel_Project();
            Assert.IsNotNull(getResult);

        }
    }
}
