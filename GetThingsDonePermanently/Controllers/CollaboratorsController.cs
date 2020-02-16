using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GetThingsDonePermanently.Models;

namespace GetThingsDonePermanently.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CollaboratorsController : ControllerBase
    {
        private readonly TodoContext _context;

        public CollaboratorsController(TodoContext context)
        {
            _context = context;
        }

        // GET: api/Collaborators
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Collaborator>>> GetCollaborators()
        {
            return await _context.Collaborators.ToListAsync();
        }

        // GET: api/Collaborators/1
        [HttpGet("{id}")]
        public async Task<ActionResult<Collaborator>> GetCollaborator(long id)
        {
            var collaborator = await _context.Collaborators.FindAsync(id);

            if (collaborator == null)
            {
                return NotFound();
            }

            return collaborator;
        }

        // PUT: api/Collaborators/1
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCollaborator(long id, Collaborator collaborator)
        {
            if (id != collaborator.TodosListId)
            {
                return BadRequest();
            }

            _context.Entry(collaborator).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CollaboratorExists(id))
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

        // POST: api/Collaborators
        [HttpPost]
        public async Task<ActionResult<Collaborator>> PostCollaborator(Collaborator collaborator)
        {
            _context.Collaborators.Add(collaborator);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (CollaboratorExists(collaborator.TodosListId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetCollaborator", new { id = collaborator.TodosListId }, collaborator);
        }

        // DELETE: api/Collaborators/1
        [HttpDelete("{id}")]
        public async Task<ActionResult<Collaborator>> DeleteCollaborator(long id)
        {
            var collaborator = await _context.Collaborators.FindAsync(id);
            if (collaborator == null)
            {
                return NotFound();
            }

            _context.Collaborators.Remove(collaborator);
            await _context.SaveChangesAsync();

            return collaborator;
        }

        private bool CollaboratorExists(long id)
        {
            return _context.Collaborators.Any(e => e.TodosListId == id);
        }
    }
}
