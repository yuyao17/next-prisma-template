import { makeSchema, objectType, stringArg, queryType } from "nexus";
import { nexusPrismaPlugin } from "nexus-prisma";
import { join } from "path";

// __dirname使えない問題はこれで解決。詳細はこちら
// https://github.com/prisma/prisma2/issues/1021
const getPath = (fileName: string) =>
  join(process.cwd(), "generated", fileName);

// objectTypeでタイプを作る。なんでも作れるが、prisma側とあわせて作るとmodel APIを提供してくれて型を補給してくれるので、便利
const User = objectType({
  name: "User",
  definition(t) {
    t.model.email();
    t.model.id();
  }
});

const Query = queryType({
  definition(t) {
    t.crud.users();
    t.crud.user();
    t.field("matchEmail", {
      type: "User",
      args: {
        email: stringArg()
      },
      resolve: (_, { email }, ctx) => {
        return ctx.prisma.user.findOne({
          where: {
            email
          }
        });
      }
    });
  }
});

const Mutation = objectType({
  name: "Mutation",
  definition(t) {
    t.crud.deleteOneUser();
  }
});

export const schema = makeSchema({
  types: [User, Query, Mutation],
  plugins: [nexusPrismaPlugin()],
  outputs: {
    typegen: getPath("nexus.ts"),
    schema: getPath("schema.graphql")
  },
  typegenAutoConfig: {
    contextType: "Context.Context",
    sources: [
      {
        source: "@prisma/client",
        alias: "prisma"
      },
      {
        source: require.resolve("./_context"),
        alias: "Context"
      }
    ]
  }
});
