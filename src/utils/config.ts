import environment from "../environment.json"
export const DISCORD_CLIENT: string = environment.CUSTOM_ENV === "production" ? "1192220732277674134" : "1218937003849154673" ;
export const DISCORD_REDIRECT: string = environment.CUSTOM_ENV === "production" ? "https://police.continentalv.fr/redirectPage" : "http://localhost:3000/redirectPage";
export const DISCORD_SCOPE: string = "identify+email+guilds.members.read";
export const DISCORD_SECRET: string =  environment.CUSTOM_ENV === "production" ?"mvVq6ZYsrlaPNz7kB9JQqDNuO_3O7w68" : "sVQgSX_Lw4u76OdV4ghLHRJqwASrAaXF";
export const BCSOHG = "1147211942797262945";
export const LSPDHG = "916440191080751165";
