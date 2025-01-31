import { google } from "googleapis";
import credentials from "./newsletter-449505-81ab93a3fd24.json";

const SHEET_ID = "1RE-7FQgYTmrRkHlaIwCbtRHuH_zQkWPxteZPCaqsIYk";
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

async function getGoogleSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: SCOPES,
  });

  const sheets = google.sheets({ version: "v4", auth });
  return sheets;
}

function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email || !isValidEmail(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid or missing email" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const sheets = await getGoogleSheetsClient();

    const existingData = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: "Sheet1!A:A",
    });

    const existingEmails = existingData.data.values
      ? existingData.data.values.flat()
      : [];

    if (existingEmails.includes(email)) {
      return new Response(
        JSON.stringify({ error: "This email is already subscribed" }),
        {
          status: 409,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const dateSubscribed = new Date().toLocaleString("en-GB", {
      timeZone: "Asia/Dhaka",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: "Sheet1!A:B",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[email, dateSubscribed]],
      },
    });

    return new Response(
      JSON.stringify({ message: "Successfully subscribed" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        details: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
