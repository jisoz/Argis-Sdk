using learningasp.Models;
using Microsoft.EntityFrameworkCore;

namespace learningasp.Data
{
    public class Dbcontext: DbContext
    {
        public  Dbcontext(DbContextOptions<Dbcontext> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("users");       
        }


    }
}
