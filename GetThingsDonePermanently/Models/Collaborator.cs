using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace GetThingsDonePermanently.Models
{
    public class Collaborator
    {
        public long TodosListId { get; set; }
        public TodosList TodosList { get; set; }
        public long UserId { get; set; }
        public IdentityUser IdentityUser { get; set; }
    }
}