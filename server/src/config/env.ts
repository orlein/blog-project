export const port: number = Number(process.env.port) || 1337;
export const isProudction: boolean = String(process.env.NODE_ENV) === 'production';
export const isTest: boolean = String(process.env.NODE_ENV) === 'test';
export const isDevelopment: boolean = String(process.env.NODE_ENV) === 'development'
