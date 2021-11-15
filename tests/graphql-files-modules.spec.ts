import { validateTs } from '@graphql-codegen/testing';
import { plugin } from '../src/index';
import { parse } from 'graphql';

describe('graphql-codegen typescript-graphql-files-modules', () => {
  it('Should generate simple module with one file', async () => {
    const result = await plugin(
      null,
      [
        {
          location: 'some/file/my-query.graphql',
          document: parse(/* GraphQL */ `
            query MyQuery {
              field
            }
          `),
        },
      ],
      {},
      { outputFile: '' }
    );

    expect(result).toBeSimilarStringTo(`
      declare module '*/my-query.graphql' {
        const MyQuery: string;

        export default MyQuery;
      }
    `);
    validateTs(result);
  });

  it('Should generate correctly for mutiple files', async () => {
    const result = await plugin(
      null,
      [
        {
          location: 'some/file/my-query.graphql',
          document: parse(/* GraphQL */ `
            query MyQuery {
              field
            }
          `),
        },
        {
          location: 'some/file/my-other-query.graphql',
          document: parse(/* GraphQL */ `
            query OtherQuery {
              field
            }
          `),
        },
      ],
      {},
      { outputFile: '' }
    );

    expect(result).toBeSimilarStringTo(`
      declare module '*/my-query.graphql' {
        const MyQuery: string;

        export default MyQuery;
      }

      declare module '*/my-other-query.graphql' {
        const OtherQuery: string;

        export default OtherQuery;
      }
    `);
    validateTs(result);
  });

  it('Should generate simple module with a custom path prefix', async () => {
    const result = await plugin(
      null,
      [
        {
          location: 'some/file/my-query.graphql',
          document: parse(/* GraphQL */ `
            query MyQuery {
              field
            }
          `),
        },
      ],
      { modulePathPrefix: 'api/' },
      { outputFile: '' }
    );

    expect(result).toBeSimilarStringTo(`
      declare module '*/api/my-query.graphql' {
        const MyQuery: string;

        export default MyQuery;
      }
    `);
    validateTs(result);
  });
});
