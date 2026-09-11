import { Portfolio } from '@/components/portfolio';
import {listAlbums,profile} from '@/lib/server';
export const dynamic='force-dynamic';
export default async function Home(){try{return <Portfolio albums={await listAlbums()} profile={await profile()}/>}catch{return <main className="login"><h1>Voltamos já.</h1><p>Não foi possível carregar as histórias agora.</p><a href="/">Tentar novamente</a></main>}}
