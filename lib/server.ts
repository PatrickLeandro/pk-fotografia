import {env} from 'cloudflare:workers';
import {getChatGPTUser} from '@/app/chatgpt-auth';
import {demoAlbum,defaultProfile} from './demo';
import type {Album,Profile} from './types';
export const runtime=env as unknown as {DB:D1Database;BUCKET:R2Bucket;ADMIN_EMAIL?:string;SITE_ORIGIN?:string};
export class HttpError extends Error {constructor(public status:number,message:string){super(message)}}
export function database(){if(!runtime.DB)throw new Error('Database unavailable');return runtime.DB}
export async function isAdmin(){const user=await getChatGPTUser();return !!(user&&runtime.ADMIN_EMAIL&&user.email.toLowerCase()===runtime.ADMIN_EMAIL.toLowerCase())}
export async function requireAdmin(){if(!await isAdmin())throw new HttpError(403,'Entre com a conta autorizada para administrar o portfólio.')}
export function checkOrigin(request:Request){const origin=request.headers.get('origin');if(!origin||!runtime.SITE_ORIGIN||origin!==runtime.SITE_ORIGIN)throw new HttpError(403,'Solicitação não autorizada. Abra o painel novamente.')}
export async function initialize(){const db=database();const settings=await db.prepare('SELECT id FROM settings WHERE id = ?').bind('profile').first();if(settings)return;
 await db.batch([db.prepare('INSERT OR IGNORE INTO albums (id,slug,data,published,sort_order,version) VALUES (?,?,?,?,?,?)').bind(demoAlbum.id,demoAlbum.slug,JSON.stringify(demoAlbum),1,0,1),db.prepare('INSERT OR IGNORE INTO settings (id,data) VALUES (?,?)').bind('profile',JSON.stringify(defaultProfile))]);}
export async function profile():Promise<Profile>{await initialize();const row=await database().prepare('SELECT data FROM settings WHERE id=?').bind('profile').first<{data:string}>();return row?JSON.parse(row.data):defaultProfile}
export async function listAlbums(admin=false):Promise<Album[]>{await initialize();const rows=await database().prepare(admin?'SELECT data,version FROM albums ORDER BY sort_order,id':'SELECT data,version FROM albums WHERE published=1 ORDER BY sort_order,id').all<{data:string;version:number}>();return rows.results.map(r=>({...JSON.parse(r.data),version:r.version}))}
export async function findAlbum(slug:string):Promise<Album|null>{await initialize();const row=await database().prepare('SELECT data,version FROM albums WHERE slug=?').bind(slug).first<{data:string;version:number}>();return row?{...JSON.parse(row.data),version:row.version}:null}
export function failure(e:unknown){if(e instanceof HttpError)return Response.json({error:e.message},{status:e.status,headers:{'Cache-Control':'no-store'}});console.error('Portfolio operation failed',e instanceof Error?e.message:'unknown');return Response.json({error:'Não foi possível concluir agora. Seus campos foram preservados; tente novamente.'},{status:503,headers:{'Cache-Control':'no-store'}})}
export const privateHeaders={'Cache-Control':'private, no-store'};
