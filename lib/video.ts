export function vimeoEmbed(value:string):string|null {
 if(!value.trim())return null;
 try{const u=new URL(value);if(u.protocol!=='https:'||!['vimeo.com','www.vimeo.com','player.vimeo.com'].includes(u.hostname))return null;
 const m=u.pathname.match(u.hostname==='player.vimeo.com'?/^\/video\/(\d+)\/?$/:/^\/(\d+)(?:\/([a-zA-Z0-9]+))?\/?$/);if(!m)return null;
 const out=new URL(`https://player.vimeo.com/video/${m[1]}`);const h=m[2]||u.searchParams.get('h');if(h&&/^[a-zA-Z0-9]+$/.test(h))out.searchParams.set('h',h);out.searchParams.set('dnt','1');return out.toString();}catch{return null;}
}
