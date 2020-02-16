using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace GetThingsDonePermanently.Models
{
    public class TodoContext : IdentityDbContext<IdentityUser>
    {
        public TodoContext(DbContextOptions<TodoContext> options) : base(options)
        {
        }

        
        public DbSet<TodosList> TodosLists { get; set; }
        public DbSet<TodoItem> TodoItems { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<Collaborator> Collaborators { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Collaborator>()
                .HasKey(t => new { t.TodosListId, t.UserId });

            modelBuilder.Entity<Collaborator>()
                .HasOne(pt => pt.TodosList)
                .WithMany(p => p.Collaborators)
                .HasForeignKey(pt => pt.TodosListId);

            modelBuilder.Entity<Tag>().HasData(new Tag { Id = 1, Name = "Utomhus" });
            modelBuilder.Entity<Tag>().HasData(new Tag { Id = 2, Name = "Värnamo" });
            modelBuilder.Entity<Tag>().HasData(new Tag { Id = 3, Name = "Hälsa" });
            modelBuilder.Entity<Tag>().HasData(new Tag { Id = 4, Name = "FintVäder" });
        }
    }
}
