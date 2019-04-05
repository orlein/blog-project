export const db_host: string = String(process.env.POSTGRES_HOST) || 'postgres';
export const db_port: number = Number(process.env.POSTGRES_PORT) || 5432;
export const db_name: string = String(process.env.POSTGRES_DB) || 'blog-project' ;
export const db_user: string = String(process.env.POSTGRES_USER) || 'jun-admin';
export const db_password: string = String(process.env.POSTGRES_PASSWORD) || 'DevAdmin';