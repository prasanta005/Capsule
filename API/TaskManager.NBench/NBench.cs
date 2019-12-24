using NBench;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManager.RESTAPI.Controllers;

namespace TaskManager.NBench
{
    public abstract class NBench
    {
        [PerfBenchmark(NumberOfIterations = 1, RunMode = RunMode.Throughput, TestMode = TestMode.Test, SkipWarmups = true)]​
        [ElapsedTimeAssertion(MaxTimeMilliseconds = 5000)]​

        public int count = 0;
        public abstract int Benchmark_Performance_ElaspedTime()​
        {​
             TaskController allTasks = new TaskController();
        }​
       ​
       
}
