import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;
if (!url) throw new Error("TURSO_DATABASE_URL is not set");

const adapter = new PrismaLibSql({ url, authToken });
const prisma = new PrismaClient({ adapter });

async function main() {
  const stage = await prisma.stage.upsert({
    where: { order: 1 },
    update: {},
    create: {
      title: "수학 기초",
      description: "AI/ML에 필요한 수학 개념을 직관적으로 익힙니다.",
      order: 1,
    },
  });

  const lessons = [
    {
      title: "벡터란 무엇인가?",
      description:
        "AI/ML의 핵심 개념인 벡터를 직관적으로 이해합니다. 크기와 방향을 가진 양이 어떻게 데이터를 표현하는지 배웁니다.",
      order: 1,
      estimatedMinutes: 15,
    },
    {
      title: "행렬과 행렬 연산",
      description:
        "행렬이 무엇인지, 그리고 AI/ML에서 데이터를 어떻게 표현하고 변환하는지 배웁니다.",
      order: 2,
      estimatedMinutes: 20,
    },
    {
      title: "미분과 경사하강법",
      description:
        "미분의 직관적 의미를 이해하고, AI 모델이 학습하는 핵심 원리인 경사하강법을 배웁니다.",
      order: 3,
      estimatedMinutes: 25,
    },
  ];

  for (const lesson of lessons) {
    await prisma.lesson.upsert({
      where: { stageId_order: { stageId: stage.id, order: lesson.order } },
      update: {},
      create: { stageId: stage.id, ...lesson },
    });
  }

  console.log(
    "Seed complete — Stage:",
    stage.title,
    "/ Lessons:",
    lessons.length,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
