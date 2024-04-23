using Microsoft.AspNetCore.Mvc;
using learningasp.Models;
using learningasp.Data;
using Microsoft.EntityFrameworkCore; // Make sure to add this using statement

[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly Dbcontext _dbContext; // Change DbContext to Dbcontext

    public UserController(Dbcontext dbContext) // Change DbContext to Dbcontext
    {
        _dbContext = dbContext;
    }

    [HttpPost("authenticate")]
    public async Task<IActionResult> Authenticate([FromBody] User userObj)
    {
        try
        {
            if (userObj == null)
            {
                return BadRequest();
            }

            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Username == userObj.Username && u.Password == userObj.Password);

            if (user != null)
            {
                return Ok(new { user });
            }
            
            else
            {
                return BadRequest(new {Message="user not found "});
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, "An error occurred while processing your request.");
        }
    }


    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] User userObj)
    {
        if (userObj == null)
        {
            return BadRequest();
        }
        await _dbContext.Users.AddAsync(userObj);
        await _dbContext.SaveChangesAsync();
        return Ok(new { Message= "user Registred" });

    }
}
