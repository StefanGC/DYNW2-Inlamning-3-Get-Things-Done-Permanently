namespace GetThingsDonePermanently.Models
{
    public class TodoItem
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public bool IsComplete { get; set; }
        public long TodoListId { get; set; }
        public string Tags { get; set; }
    }
}
