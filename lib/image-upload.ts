export async function webImage(file:File,maxSide:number,quality:number):Promise<Blob>{
 if(!['image/jpeg','image/png','image/webp'].includes(file.type))throw new Error('Use fotos em JPG, PNG ou WebP.');
 if(file.size>40*1024*1024)throw new Error('Cada arquivo original pode ter até 40 MB.');
 const bitmap=await createImageBitmap(file);try{const scale=Math.min(1,maxSide/Math.max(bitmap.width,bitmap.height));const canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(bitmap.width*scale));canvas.height=Math.max(1,Math.round(bitmap.height*scale));const context=canvas.getContext('2d');if(!context)throw new Error('Não foi possível preparar esta foto.');context.drawImage(bitmap,0,0,canvas.width,canvas.height);return await new Promise<Blob>((resolve,reject)=>canvas.toBlob(blob=>blob?resolve(blob):reject(new Error('Falha ao converter a foto.')),'image/webp',quality));}finally{bitmap.close()}
}
