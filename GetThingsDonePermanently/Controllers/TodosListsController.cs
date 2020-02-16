using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GetThingsDonePermanently.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GetThingsDonePermanently.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class TodosListsController : ControllerBase
    {
        private readonly TodoContext _context;

        public TodosListsController(TodoContext context)
        {
            _context = context;
        }

        // GET: api/TodosLists
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodosList>>> GetTodosLists()
        {
            return await _context.TodosLists.ToListAsync();
        }

        // GET: api/TodosLists/1
        [HttpGet("{id}")]
        public async Task<ActionResult<TodosList>> GetTodosList(long id)
        {
            var todosList = await _context.TodosLists.FindAsync(id);

            if (todosList == null)
            {
                return NotFound();
            }

            return todosList;
        }

        // PUT: api/TodosLists/1
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodosList(long id, TodosList todosList)
        {
            if (id != todosList.Id)
            {
                return BadRequest();
            }

            _context.Entry(todosList).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TodosListExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/TodosLists
        [HttpPost]
        public async Task<ActionResult<TodosList>> PostTodosList(TodosList todosList)
        {
            _context.TodosLists.Add(todosList);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTodosList", new { id = todosList.Id }, todosList);
        }

        // DELETE: api/TodosLists/1
        [HttpDelete("{id}")]
        public async Task<ActionResult<TodosList>> DeleteTodosList(long id)
        {
            var todosList = await _context.TodosLists.FindAsync(id);
            if (todosList == null)
            {
                return NotFound();
            }

            _context.TodosLists.Remove(todosList);
            await _context.SaveChangesAsync();

            return todosList;
        }

        private bool TodosListExists(long id)
        {
            return _context.TodosLists.Any(e => e.Id == id);
        }
    }
}
