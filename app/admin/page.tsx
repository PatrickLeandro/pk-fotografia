import {getChatGPTUser,chatGPTSignInPath} from '@/app/chatgpt-auth';
import {isAdmin,listAlbums,profile} from '@/lib/server';
import {SiteHeader,SiteFooter} from '@/components/portfolio';
import {Admin} from '@/components/admin';
export const dynamic='force-dynamic';
export const metadata={title:'Painel do fotógrafo',robots:{index:false,follow:false}};
export default async function Page(){const user=await getChatGPTUser();if(!user)return <><SiteHeader name="PK Fotografia"/><main className="login"><div className="eyebrow">Área reservada</div><h1>Seu próximo<br/><em>capítulo.</em></h1><p>Entre para organizar as fotos, selecionar os destaques e publicar novas histórias.</p><a className="primary-link" href={chatGPTSignInPath('/admin')} target="_top">Entrar com ChatGPT</a><p className="muted">Acesso exclusivo à conta do fotógrafo.</p></main><SiteFooter name="PK Fotografia"/></>;if(!await isAdmin())return <main className="login"><h1>Acesso reservado</h1><p>Esta conta não está autorizada a administrar o portfólio.</p><a href="/signout-with-chatgpt?return_to=%2Fadmin">Sair e trocar de conta</a></main>;try{return <Admin initialAlbums={await listAlbums(true)} initialProfile={await profile()}/>}catch{return <main className="login"><h1>Um instante.</h1><p>O armazenamento está indisponível. Tente abrir o painel novamente.</p><a href="/admin">Tentar novamente</a></main>}}
