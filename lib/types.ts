export type Photo = { id:string; caption:string; url:string; thumb:string; credit?:string; source?:string };
export type Album = { id:string; slug:string; title:string; description:string; category:string; video:string; photos:Photo[]; highlights:string[]; cover:string; published:boolean; demo:boolean; order:number; version:number };
export type Profile = { name:string; introduction:string; logo?:string; logoDark?:string };
