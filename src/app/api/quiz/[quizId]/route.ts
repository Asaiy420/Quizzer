import {prisma} from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
export async function POST(
  req: NextRequest,
  { params }: { params: { quizId: string } }
) {
  const quizId = params.quizId;
  const { text, options, answer } = await req.json();
  const session = await getServerSession(authOptions);

  try {
    if (!session) {
      return NextResponse.json(
        { message: "You are not logged in" },
        { status: 403 }
      );
    }

    // check for the user email

    const userEmail = session?.user?.email;

    if (!userEmail){
        return NextResponse.json({ message: "You are not logged in" }, { status: 403 });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User with this email does not exist" },
        { status: 404 }
      );
    }

    if (!text || !Array.isArray(options) || options.length < 2 || !answer){
        return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
    }

    const newQuiz = await prisma.question.create({
        data: {
            quizId,
            text,
            options,
            answer
        }
    })

    return NextResponse.json({
        message: "Quiz created successfully",
        newQuiz
    })

  } catch (error) {
    return NextResponse.json({message: "An error occured when creating the quiz", error}, {status: 500});
  }
}
