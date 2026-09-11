import { Gallery } from '@/components/portfolio';
import { notFound } from 'next/navigation';
import {findAlbum,isAdmin,profile} from '@/lib/server';
export const dynamic='force-dynamic';
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){try{const a=await findAlbum((await params).slug);return a?.published?{title:`${a.title} — PK Fotografia`,description:a.description}:{title:'Galeria — PK Fotografia',robots:{index:false,follow:false}}}catch{return {title:'Galeria — PK Fotografia'}}}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;let a;let p;try{a=await findAlbum(slug);p=await profile()}catch{return <main className="login"><h1>Um instante.</h1><p>Não foi possível carregar esta galeria. Tente novamente.</p><a href={`/galeria/${slug}`}>Recarregar galeria</a></main>}if(!a||(!a.published&&!await isAdmin()))notFound();return <Gallery album={a} profile={p} preview={!a.published}/>}
