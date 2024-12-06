import { defineConfig } from 'tsup';
 
export default defineConfig({
    format: ['esm','cjs'],
    entry: ['./src/main.ts'],
    dts: true,
    shims: true,
    skipNodeModulesBundle: true,
    clean: true,
});