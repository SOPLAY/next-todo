import { nextConnectErrorHandler, nextConnectRouter } from "@/lib/nextConnect";
import { prisma } from "@/lib/prisma";

const router = nextConnectRouter();

// GET
router.get(async (req, res) => {
  const { id } = req.query;
  const todo = await prisma.todo.findUnique({
    where: {
      id: id! as string,
    },
  });
  if (!todo) return res.status(404).json({ message: "not found" });
  res.json(todo);
});

// PUT
router.put(async (req, res) => {
  const { id } = req.query;
  const {
    title = undefined,
    description = undefined,
    completed = undefined,
  } = req.body;

  const todo = await prisma.todo.update({
    where: {
      id: id! as string,
    },
    data: {
      title,
      description,
      completed,
    },
  });

  if (!todo) return res.status(404).json({ message: "not found" });
  res.json(todo);
});

// DELETE
router.delete(async (req, res) => {
  const { id } = req.query;
  const todo = await prisma.todo.delete({
    where: {
      id: id! as string,
    },
  });

  if (!todo) return res.status(404).json({ message: "not found" });

  res.json({ message: "success" });
});

export default router.handler({
  onError: nextConnectErrorHandler,
});
