// Node 24 tooling: resolve the same extensionless relative TypeScript imports as Next.js.
import { registerHooks } from 'node:module';
registerHooks({
  resolve(specifier, context, nextResolve) {
    if (
      !context.parentURL?.includes('/node_modules/') &&
      specifier.startsWith('.') &&
      !/\.[a-z]+$/i.test(specifier)
    ) {
      return nextResolve(`${specifier}.ts`, context);
    }
    return nextResolve(specifier, context);
  },
});
