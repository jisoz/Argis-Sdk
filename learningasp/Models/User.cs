﻿using System.ComponentModel.DataAnnotations;
using System.Drawing;

namespace learningasp.Models
{
    public class User
    {

        [Key]
        public int Id { get; set; }
        public string? FirstName { get; set; }

        public string? LastName { get; set; }
       
        public string? Username { get; set; }
        
        public string? Email { get; set; }
       
        public string? Password { get; set; }


    }
}
