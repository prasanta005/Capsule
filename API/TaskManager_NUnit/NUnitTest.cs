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
        
    }
}
