interface ImportMetaEnv {
  readonly DEV: boolean;
  readonly PROD: boolean;
  readonly STRAPI_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
