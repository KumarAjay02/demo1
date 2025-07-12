using System.Data;
using AutoMapper;
using Backend.Data.Contexts;
using Backend.DTOs;
using Backend.Features.Login;
using Backend.Features.MenuList;
using Backend.Models.Entities;
using Backend.Modules.Master.Admin.Users;
using Backend.Modules.Master.Common.Branch;
using Backend.Modules.Master.Common.Company;
using Backend.Modules.Master.Common.CompanyDivision;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServiceStack;
//using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Backend.Modules.Master.Admin.UserRights
{
    [Microsoft.AspNetCore.Mvc.Route("api")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        //private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;
        public TimsContext _context { get; }
        public Comp_DivisionContext _Comp_Div_Context { get; }

        private readonly IMapper _mapper;
        public UsersController(IConfiguration configuration, TimsContext lcontext, IMapper mapper,Comp_DivisionContext comp_DivisionContext)
        {
            _configuration = configuration;
            _context = lcontext;
            _mapper = mapper;
            _Comp_Div_Context = comp_DivisionContext;
        }

        [HttpGet("account")]
        [Authorize]
        public async Task<IActionResult> GetProfile()
        {
            var Login = User.Claims.FirstOrDefault(c => c.Type == System.Security.Claims.ClaimTypes.NameIdentifier);
            if (Login == null)
            {
                return Unauthorized(new { message = "Invalid token: Email claim missing." });
            }
            string LoginId = Login.Value;
            var user = await _context.MstUsers
                .FirstOrDefaultAsync(u => u.Id == Convert.ToInt32(LoginId));
            if (user == null)
            {
                return NotFound(new { message = "User not found." });
            }
            var profile = new AccountDTO
            {
                activated = true,
                email = user.Email,
                firstName = user.User,
                langKey = "EN",
                lastName = "",
                login = user.Login,
                imageUrl = null,
                authorities = [.. _context.TrnUserrights.Where(ur => ur.MstUser.Login.ToLower() == user.Login.ToLower()).Select(mn => mn.Menu.Url)]
            };
            return Ok(profile);
        }

        [HttpGet("employee-views-card/{login}")]
        [Authorize]
        public async Task<IActionResult> getLoginDetail([FromRoute] string login)
        {
            var emailClaim = User.Claims.FirstOrDefault(c => c.Type == System.Security.Claims.ClaimTypes.Email);
            if (emailClaim == null)
            {
                return Unauthorized(new { message = "Invalid token: Email claim missing." });
            }
            string userEmail = emailClaim.Value;
            var user = await _context.MstUsers
                .FirstOrDefaultAsync(u => u.Login.ToLower() == login.ToLower());
            if (user == null)
            {
                return NotFound(new { message = "User not found." });
            }
            var profile = new ProfileDTO
            {
                Id = user.Id,
                Email = user.Email,
                user = user.User,
                Login = user.Login,
               // Roles = _context.TrnUserrights.Where(ur => ur.MstUser.Login.ToLower() == user.Login.ToLower()).ToList()
            };
            return Ok(profile);
        }


        [HttpPut("/api/UpdateProfile/{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateProfile(string id, [FromBody]  RegisterDTO users)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var login = User.Claims.FirstOrDefault(c => c.Type == "login")?.Value;
            if (login == null)
            {
                return Unauthorized(new { message = "Invalid token: Email claim missing." });
            }

            if (!string.IsNullOrEmpty(users.Email))
            {
                var emailExists = await _context.MstUsers
                    .AnyAsync(u => u.Email.ToLower() == users.Email.ToLower() && u.Id != users.id && u.UserStatus==1);
                if (emailExists)
                {
                    return Conflict(new { message = "Email is already in use by another account." });
                }
            }
            if (id != users.id.ToString())
            {
                return BadRequest();
            }
            var existingUser = await _context.MstUsers
       .Include(u => u.UserCompanies)
       .Include(u => u.UserDivisions)
       .Include(u => u.UserBranches)
       .FirstOrDefaultAsync(u => u.Id == users.id);

            if (existingUser == null)
            {
                return NotFound();
            }
            _mapper.Map(users, existingUser);

            if (!string.IsNullOrEmpty(users.Password))
            {
                string pwdkey = CommonFile.loginpwdkey;
                existingUser.Password = CommonFile.EncryptString(users.Password, pwdkey);
            }
            _context.MstUserCompanies.RemoveRange(existingUser.UserCompanies);
            _context.MstUserDivisions.RemoveRange(existingUser.UserDivisions);
            _context.MstUserBranches.RemoveRange(existingUser.UserBranches);
            if (users.Companies != null)
            {
                existingUser.UserCompanies = users.Companies.Select(c => new MstUserCompany
                {
                    UserId = users.id,
                    CompanyCode = c.CoCode
                }).ToList();
            }

            if (users.Divisions != null)
            {
                existingUser.UserDivisions = users.Divisions.Select(d => new MstUserDivision
                {
                    UserId = users.id,
                    DivisionCode = d.DivCode
                }).ToList();
            }

            if (users.Branches != null)
            {
                existingUser.UserBranches = users.Branches.Select(b => new MstUserBranch
                {
                    UserId = users.id,
                    BranchCode = b.BranchCode
                }).ToList();
            }

            await _context.SaveChangesAsync();

            return Ok(new { message = "Profile updated successfully." });
        }


        [HttpPost("create-user")]
        [Authorize]
        public async Task<IActionResult> createUSer([FromBody] RegisterDTO users)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var existingUser = await _context.MstUsers
                .FirstOrDefaultAsync(u => u.Login.ToLower() == users.Login.ToLower());
            if (existingUser != null)
            {
                return Conflict(new { message = "User is already registered." });
            }
            if (!string.IsNullOrEmpty(users.Email))
            {
                var emailExists = await _context.MstUsers
                    .AnyAsync(u => u.Email.ToLower() == users.Email.ToLower() && u.UserStatus == 1);
                if (emailExists)
                {
                    return Conflict(new { message = "Email is already in use by another account." });
                }
            }
            string pwdkey = CommonFile.loginpwdkey;

            string hashedPassword = CommonFile.EncryptString(users.Password, pwdkey);
       

            MstUser user = _mapper.Map<MstUser>(users);
            user.Password = hashedPassword;
            if (users.Companies != null)
            {
                user.UserCompanies = users.Companies.Select(c => new MstUserCompany
                {
                    CompanyCode = c.CoCode
                }).ToList();
            }

            if (users.Divisions != null)
            {
                user.UserDivisions = users.Divisions.Select(d => new MstUserDivision
                {
                    DivisionCode = d.DivCode
                }).ToList();
            }

            if (users.Branches != null)
            {
                user.UserBranches = users.Branches.Select(b => new MstUserBranch
                {
                    BranchCode = b.BranchCode
                }).ToList();
            }

            _context.MstUsers.Add(user);

            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetProfile), new { id = user.Id }, new { message = "User registered successfully." });
        }

        [HttpGet("menu-list/{login}")]
        [Authorize]
        public async Task<IActionResult> getMenuList([FromRoute] string login)
        {
            var Login = User.Claims.FirstOrDefault(c => c.Type == System.Security.Claims.ClaimTypes.NameIdentifier);
            if (Login == null)
            {
                return Unauthorized(new { message = "Invalid token: Email claim missing." });
            }
            //string LoginId = Login.Value;
            //var rights = await _context.TrnUserrights
            //    .FirstOrDefaultAsync(u => u.UserLogin == login);


            //if (rights == null)
            //{
            //    return NotFound(new { message = "No Menu." });
            //}
            List<MenuDTO> menuDTOs = _context.GetUserRightsWithMenu(login, 0);

            List<MenuListDTO> menuList = PopulateMenu(menuDTOs, 0, login);

            return Ok(menuList);
        }

        private List<MenuListDTO> PopulateMenu(List<MenuDTO> menuDTOs, int parentMenuId, string login)
        {
            List<MenuListDTO> menus = new List<MenuListDTO>();
            if (menuDTOs != null && menuDTOs.Count > 0)
            {
                foreach (var item in menuDTOs)
                {
                    MenuListDTO menuList = new MenuListDTO();
                    menuList.menuId = item.menuId;
                    menuList.menuName = item.menuName;
                    menuList.menyType = item.mType;
                    menuList.link = item.url;
                    List<MenuDTO> submenuDTOs = _context.GetUserRightsWithMenu(login, item.menuId);
                    if (submenuDTOs != null && submenuDTOs.Count > 0)
                    {
                        menuList.children = PopulateMenu(submenuDTOs, item.menuId, login);
                    }
                    menus.Add(menuList);
                }
            }
            return menus;
        }


        [HttpPost("menu-access-masters-validate")]
        [Authorize]
        public async Task<IActionResult> validate([FromBody] MenuValidateDTO menuDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var Login = User.Claims.FirstOrDefault(c => c.Type == System.Security.Claims.ClaimTypes.NameIdentifier);
            if (Login == null)
            {
                return Unauthorized(new { message = "Invalid token: Email claim missing." });
            }
            int lgn = Convert.ToInt32(Login.Value);
            var menuid = await _context.MstMenus.FirstOrDefaultAsync(m => m.Url == menuDto.code);
            if (menuid == null)
            {
                return NotFound(new { message = "Menu Not Found" });
            }
            var menu = await _context.TrnUserrights
                .FirstOrDefaultAsync(u => u.MenuId == menuid.Id && u.MstUser.Id == lgn);
            if (menu == null)
            {
                return Unauthorized(new { message = "Not Authorized to access this page." });
            }

            return Ok();
        }
        [HttpPost("menu-access-masters-authenticate")]
        [Authorize]
        public async Task<IActionResult> Authenticate([FromBody] MenuValidateDTO menuDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var Login = User.Claims.FirstOrDefault(c => c.Type == "login")?.Value;
            if (Login == null)
            {
                return Unauthorized(new { message = "Invalid token: Email claim missing." });
            }
           // Int32 lgn = Convert.ToInt32(Login.Value);

            var menu = await _context.TrnUserrights
                .FirstOrDefaultAsync(u => u.Menu.Url.ToLower() == menuDto.code.ToLower() && u.User.ToLower() == Login.ToLower());
            if (menu == null)
            {
                return Unauthorized(new { message = "Not Authorized to access this page." });
            }
            UserRightsDTO userRights = new UserRightsDTO();
            userRights.menuId = menu.MenuId;
            userRights.isActive = menu.IsActive == "Y" ? true : false;
            userRights.view = menu.View == "Y" ? true : false;
            userRights.add = menu.Add == "Y" ? true : false;
            userRights.update = menu.Update == "Y" ? true : false;
            userRights.deleted = menu.Delete == "Y" ? true : false;
            userRights.print = menu.Print == "Y" ? true : false;
            userRights.approval=menu.Approval == "Y" ? true : false;
            userRights.search = menu.Search == "Y" ? true : false;

            return Ok(userRights);
        }

        [HttpGet("active-users")]
        [Authorize]
        public async Task<IActionResult> getActiveUsers()
        {
            var Login = User.Claims.FirstOrDefault(c => c.Type == "login");
            if (Login == null)
            {
                return Unauthorized(new { message = "Invalid token: Email claim missing." });
            }
            string LoginId = Login.Value;
            var user = _context.MstUsers.ToList();
           // var user = _context.MstUsers
           //.Where(u => u.PermLock != 1).ToList();
            return Ok(user);
        }

        [HttpGet("rights-by-user/{login}")]
        [Authorize]
        public async Task<IActionResult> getRightsByUser([FromRoute] string login)
        {
            var Login = User.Claims.FirstOrDefault(c => c.Type == System.Security.Claims.ClaimTypes.NameIdentifier);
            if (Login == null)
            {
                return Unauthorized(new { message = "Invalid token: Email claim missing." });
            }
          
            List<UserRightsDTO> rightsDTOs = _context.GetUserRightsWithMenuByUser(int.Parse(login));

            return Ok(rightsDTOs);
        }
        [HttpPut("assign-rights")]
        [Authorize]
        public async Task<IActionResult> Register([FromBody] UserRightsDTO[] userRights)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var Login = User.Claims.FirstOrDefault(c => c.Type == System.Security.Claims.ClaimTypes.NameIdentifier);
            if (Login == null)
            {
                return Unauthorized(new { message = "Invalid token: Email claim missing." });
            }



            foreach (var item in userRights)
            {
                TrnUserright trn = new TrnUserright();
                trn.User = item.user;
                if (item.id != null)
                {
                    trn.Id = (long)item.id;
                }
                
                trn.MenuId = item.menuId;
                trn.View = item.view?"Y":"N";
                trn.Add = item.add ? "Y" : "N";
                trn.Update = item.update ? "Y" : "N";
                trn.Delete = item.deleted ? "Y" : "N";
                trn.Print = item.print ? "Y" : "N";
                trn.IsActive = item.isActive ? "Y" : "N";
                trn.Search = item.search ? "Y" : "N";
                trn.Approval = item.approval ? "Y" : "N";
                trn.MType = item.menuType.Substring(0,1)=="P"?"P":"S";
                _context.TrnUserrights.Update(trn);
            }
            
            await _context.SaveChangesAsync();
            return Ok(new { message = "Profile updated successfully." });
        }

        [HttpGet("menu-search/{menuname}")]
        [Authorize]
        public async Task<IActionResult> getMenuByUser([FromRoute] string menuname)
        {
            var Login = User.Claims.FirstOrDefault(c => c.Type == System.Security.Claims.ClaimTypes.NameIdentifier);
            if (Login == null)
            {
                return Unauthorized(new { message = "Invalid token: Email claim missing." });
            }

            List<UserRightsDTO> rightsDTOs = _context.GetUsersMenuAutofill(Convert.ToInt32(Login.Value), menuname);

            return Ok(rightsDTOs);
        }

        [HttpPost("/api/Users-search")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<RegisterDTO>>> SearchUserMasters([FromBody] UserSearchDTO userSearch)
        {

            var query = _context.MstUsers.AsQueryable();

            if (!string.IsNullOrEmpty(userSearch.loginCode))
            {
                query = query.Where(c => c.Login.Contains(userSearch.loginCode));
            }

            if (!string.IsNullOrEmpty(userSearch.userName))
            {
                query = query.Where(c => c.User.Contains(userSearch.userName));
            }
            var users = await query.ToListAsync();
            RegisterDTO[] userMasterDTO = _mapper.Map<RegisterDTO[]>(users);
            

            return Ok(userMasterDTO);
        }
        [HttpGet("/api/Users-search/{id}")]
        [Authorize]
        public async Task<ActionResult<RegisterDTO>> GetUserMaster(string id)
        {
            var userId = id.EqualsIgnoreCase("Nan") ? 0 : Convert.ToInt32(id);

            var userMaster = await _context.MstUsers
                .Include(u => u.UserCompanies)
                .Include(u => u.UserDivisions)
                .Include(u => u.UserBranches)
                .FirstOrDefaultAsync(c => c.Id == userId);

            if (userMaster == null)
            {
                return NotFound();
            }

            var userMasterDTO = _mapper.Map<RegisterDTO>(userMaster);
            userMasterDTO.Password = CommonFile.DecryptString(userMasterDTO.Password, CommonFile.loginpwdkey);

            // Include full company, division, branch info
            var companyCodes = userMaster.UserCompanies.Select(c => c.CompanyCode).Distinct().ToList();
            var divisionCodes = userMaster.UserDivisions.Select(d => d.DivisionCode).Distinct().ToList();
            var branchCodes = userMaster.UserBranches.Select(b => b.BranchCode).Distinct().ToList();

            // Query master tables (assuming they are available in DbContext)
            if (companyCodes.Count > 0)
            {
                var companies = await _context.Set<CompanyMaster>().Where(c => companyCodes.Contains(c.CoCode)).ToListAsync();
                userMasterDTO.Companies = _mapper.Map<List<CompanyMasterDTO>>(companies);
            }
            if (divisionCodes.Count > 0)
            {
                var divisions = await _Comp_Div_Context.Set<CompDivision>().Where(d => divisionCodes.Contains(d.DivCode)).ToListAsync();
                userMasterDTO.Divisions = _mapper.Map<List<DivisionMasterDTO>>(divisions);
            }
            if (branchCodes.Count > 0)
            {
                var branches = await _context.Set<BranchMaster>().Where(b => branchCodes.Contains(b.BranchCode)).ToListAsync();
                userMasterDTO.Branches = _mapper.Map<List<BranchMasterDTO>>(branches);
            }



            return userMasterDTO;
        }


    }
}
