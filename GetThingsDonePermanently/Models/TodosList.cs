using System.Collections.Generic;

namespace GetThingsDonePermanently.Models
{
    public class TodosList
    {
        public long Id { get; set; }
        public string Name { get; set;}
        public string Description { get; set; }
        public long TodoItemId { get; set; }
        public string OwnerId { get; set; }
        public List<Collaborator> Collaborators { get; set; }
    }
}
