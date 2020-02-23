import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
}
// apolloServerでprismaをcontextとして渡すと、のちにnexus側で使用可能になる
export const createContext = () => ({ prisma });
