using AngularApp_EFCodeFirst.Server.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
namespace AngularApp_EFCodeFirst.Server.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<EmployeeController> _logger;

        public EmployeeController(AppDbContext context, ILogger<EmployeeController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/Employee
        [HttpGet]
        public async Task<IActionResult> GetEmployees()
        {
            _logger.LogInformation("GET /api/Employee called");
            try
            {
                var employees = await _context.Employees.ToListAsync();
                return Ok(employees);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in GetEmployees");
                return StatusCode(500, "Internal server error");
            }
        }

        // GET: api/Employee/1
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployee(int id)
        {
            _logger.LogInformation("GET /api/Employee/{Id} called", id);
            try
            {
                var employee = await _context.Employees.FindAsync(id);

                if (employee == null)
                {
                    _logger.LogWarning("Employee {Id} not found", id);
                    return NotFound();
                }

                return Ok(employee);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in GetEmployee {Id}", id);
                return StatusCode(500, "Internal server error");
            }
        }

        // POST: api/Employee
        [HttpPost]
        public async Task<IActionResult> CreateEmployee(Employee employee)
        {
            _logger.LogInformation("POST /api/Employee called");
            try
            {
                _context.Employees.Add(employee);
                await _context.SaveChangesAsync();

                _logger.LogInformation("Employee created with Id {Id}", employee.Id);
                return Ok(employee);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in CreateEmployee");
                return StatusCode(500, "Internal server error");
            }
        }

        // PUT: api/Employee/1
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployee(int id, Employee employee)
        {
            _logger.LogInformation("PUT /api/Employee/{Id} called", id);
            try
            {
                var existingEmployee = await _context.Employees.FindAsync(id);

                if (existingEmployee == null)
                {
                    _logger.LogWarning("Employee {Id} not found for update", id);
                    return NotFound();
                }

                existingEmployee.Name = employee.Name;
                existingEmployee.Salary = employee.Salary;

                await _context.SaveChangesAsync();

                _logger.LogInformation("Employee {Id} updated", id);
                return Ok(existingEmployee);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in UpdateEmployee {Id}", id);
                return StatusCode(500, "Internal server error");
            }
        }

        // DELETE: api/Employee/1
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            _logger.LogInformation("DELETE /api/Employee/{Id} called", id);
            try
            {
                var employee = await _context.Employees.FindAsync(id);

                if (employee == null)
                {
                    _logger.LogWarning("Employee {Id} not found for delete", id);
                    return NotFound();
                }

                _context.Employees.Remove(employee);
                await _context.SaveChangesAsync();

                _logger.LogInformation("Employee {Id} deleted", id);
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in DeleteEmployee {Id}", id);
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
