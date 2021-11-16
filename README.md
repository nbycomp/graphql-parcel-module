# graphql-parcel-module

NPM module for generating TypeScript definition (.d.ts) files compatible with the Parcel v2 GraphQL bundler.

Assumes one document (query/mutation) per file.

Adapted from https://www.npmjs.com/package/@graphql-codegen/typescript-graphql-files-modules

Plugin options shown here https://www.graphql-code-generator.com/docs/plugins/typescript-graphql-files-modules
**N.B.** `type` is not supported here, as the Parcel bundler imports GraphQL files as `string`.
