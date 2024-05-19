import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schemaForValidation = z
  .array(z.number().int().nonnegative().max(10000000))
  .max(20);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = schemaForValidation.safeParse(body);
    if (!validation.success)
      return NextResponse.json({ error: "Bad input" }, { status: 400 });
    let data: any[] = [];
    for (let index = 0; index < body.length; index++) {
      const res = await fetch(
        "https://api.themoviedb.org/3/movie/" + body[index] + "?language=en-US",
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: "Bearer " + process.env.TMDB_API_KEY,
          },
          next: { revalidate: 6 * 60 * 60 }, // 6 hours
        }
      );
      const resData = await res.json();
      resData.responseCode = res.status;
      if (res.status !== 200) {
        resData.id = body[index];
      }
      data.push(resData);
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
