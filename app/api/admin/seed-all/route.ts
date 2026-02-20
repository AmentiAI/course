import { NextResponse } from "next/server";
import { seedAllCourses } from "@/lib/seed-all-courses";

export const maxDuration = 300; // 5 minutes for seeding

export async function POST(request: Request) {
  try {
    const { secret } = await request.json();
    
    if (secret !== "seed-database-2026") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("🌱 Starting full database seed with all 70 courses...");
    
    const result = await seedAllCourses();

    return NextResponse.json({ 
      success: true, 
      message: `Successfully seeded ${result.created} courses!`,
      details: result
    });

  } catch (error: any) {
    console.error("Seed error:", error);
    return NextResponse.json({ 
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}
