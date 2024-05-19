import { POST } from "@/app/api/revalidateRatedMovies/route";
import { NextRequest } from "next/server";

describe("/api/revalidateRatedMovies", () => {
  test("Sending request without body", async () => {
    const nextRequest = new NextRequest(
      "http://localhost:3000/api/revalidateRatedMovies",
      {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          "X-Forwarded-For": "test",
        },
      }
    );

    const response = await POST(nextRequest);
    expect(response.status).toBe(500);
    const body = await response.json();
    expect(body.error).toEqual("Unexpected end of JSON input");
  });
  test("Sending request with bad input", async () => {
    const nextRequest = new NextRequest(
      "http://localhost:3000/api/revalidateRatedMovies",
      {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          "X-Forwarded-For": "test",
        },
        body: JSON.stringify([-1, 5559]),
      }
    );

    const response = await POST(nextRequest);
    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.error).toEqual("Bad input");
  });
  test("Sending request with valid input", async () => {
    const nextRequest = new NextRequest(
      "http://localhost:3000/api/revalidateRatedMovies",
      {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          "X-Forwarded-For": "test",
        },
        body: JSON.stringify([5559]),
      }
    );

    const response = await POST(nextRequest);
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body[0].id).toBe(5559);
  });
});
