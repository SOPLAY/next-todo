import { nextConnectErrorHandler, nextConnectRouter } from "@/lib/nextConnect";
import { prisma } from "@/lib/prisma";

const router = nextConnectRouter();

router.get(async (_, res) => {
  const todos = await prisma.todo.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  res.json({ todoList: todos });
});

export default router.handler({
  onError: nextConnectErrorHandler,
});
