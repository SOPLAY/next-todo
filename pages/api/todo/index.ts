import { nextConnectErrorHandler, nextConnectRouter } from "@/lib/nextConnect";
import { prisma } from "@/lib/prisma";

const router = nextConnectRouter();

router.post(async (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    return res.status(400).json({ message: "title 값은 필수 입니다." });
  }

  const todo = await prisma.todo.create({
    data: {
      title,
      description,
    },
  });

  return res.status(201).json(todo);
});

export default router.handler({
  onError: nextConnectErrorHandler,
});
