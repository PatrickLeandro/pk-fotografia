import {sqliteTable,text,integer,index} from 'drizzle-orm/sqlite-core';
export const albums=sqliteTable('albums',{id:text('id').primaryKey(),slug:text('slug').notNull().unique(),data:text('data').notNull(),published:integer('published').notNull().default(0),sortOrder:integer('sort_order').notNull().default(0),version:integer('version').notNull().default(1)},t=>[index('idx_albums_published_order').on(t.published,t.sortOrder)]);
export const assets=sqliteTable('assets',{id:text('id').primaryKey(),albumId:text('album_id').references(()=>albums.id),caption:text('caption').notNull(),createdAt:text('created_at').notNull()},t=>[index('idx_assets_album').on(t.albumId)]);
export const settings=sqliteTable('settings',{id:text('id').primaryKey(),data:text('data').notNull()});
