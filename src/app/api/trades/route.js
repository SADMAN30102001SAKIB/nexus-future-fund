export async function GET(req) {
  const url =
    "https://my.socialtradertools.com/view/86SOq3yhFN4k4uMK/trades.json";

  try {
    const response = await fetch(url, { method: "GET", timeout: 5000 });

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching trades:", error.message);

    return new Response(
      JSON.stringify({ error: "Failed to fetch data from the API" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
