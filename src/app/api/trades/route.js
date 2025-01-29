const API_TOKEN =
  "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YmRmNjNiZjM4NjllOGU1MjE3NGViZWQ3YTE2NjQzYSIsInBlcm1pc3Npb25zIjpbXSwiYWNjZXNzUnVsZXMiOlt7ImlkIjoidHJhZGluZy1hY2NvdW50LW1hbmFnZW1lbnQtYXBpIiwibWV0aG9kcyI6WyJ0cmFkaW5nLWFjY291bnQtbWFuYWdlbWVudC1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciJdLCJyZXNvdXJjZXMiOlsiYWNjb3VudDokVVNFUl9JRCQ6MzQyNTA0MjYtZjVjYS00ODI0LTg1YTItNDU3OGZlNWQ3ZTM3Il19LHsiaWQiOiJtZXRhYXBpLXJlc3QtYXBpIiwibWV0aG9kcyI6WyJtZXRhYXBpLWFwaTpyZXN0OnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIiwid3JpdGVyIl0sInJlc291cmNlcyI6WyJhY2NvdW50OiRVU0VSX0lEJDozNDI1MDQyNi1mNWNhLTQ4MjQtODVhMi00NTc4ZmU1ZDdlMzciXX0seyJpZCI6Im1ldGFhcGktcnBjLWFwaSIsIm1ldGhvZHMiOlsibWV0YWFwaS1hcGk6d3M6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbImFjY291bnQ6JFVTRVJfSUQkOjM0MjUwNDI2LWY1Y2EtNDgyNC04NWEyLTQ1NzhmZTVkN2UzNyJdfSx7ImlkIjoibWV0YWFwaS1yZWFsLXRpbWUtc3RyZWFtaW5nLWFwaSIsIm1ldGhvZHMiOlsibWV0YWFwaS1hcGk6d3M6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbImFjY291bnQ6JFVTRVJfSUQkOjM0MjUwNDI2LWY1Y2EtNDgyNC04NWEyLTQ1NzhmZTVkN2UzNyJdfSx7ImlkIjoibWV0YXN0YXRzLWFwaSIsIm1ldGhvZHMiOlsibWV0YXN0YXRzLWFwaTpyZXN0OnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIl0sInJlc291cmNlcyI6WyJhY2NvdW50OiRVU0VSX0lEJDozNDI1MDQyNi1mNWNhLTQ4MjQtODVhMi00NTc4ZmU1ZDdlMzciXX0seyJpZCI6InJpc2stbWFuYWdlbWVudC1hcGkiLCJtZXRob2RzIjpbInJpc2stbWFuYWdlbWVudC1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciJdLCJyZXNvdXJjZXMiOlsiYWNjb3VudDokVVNFUl9JRCQ6MzQyNTA0MjYtZjVjYS00ODI0LTg1YTItNDU3OGZlNWQ3ZTM3Il19LHsiaWQiOiJjb3B5ZmFjdG9yeS1hcGkiLCJtZXRob2RzIjpbImNvcHlmYWN0b3J5LWFwaTpyZXN0OnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIiwid3JpdGVyIl0sInJlc291cmNlcyI6WyIqOiRVU0VSX0lEJDoqIl19LHsiaWQiOiJtdC1tYW5hZ2VyLWFwaSIsIm1ldGhvZHMiOlsibXQtbWFuYWdlci1hcGk6cmVzdDpkZWFsaW5nOio6KiIsIm10LW1hbmFnZXItYXBpOnJlc3Q6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbIio6JFVTRVJfSUQkOioiXX0seyJpZCI6ImJpbGxpbmctYXBpIiwibWV0aG9kcyI6WyJiaWxsaW5nLWFwaTpyZXN0OnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIl0sInJlc291cmNlcyI6WyIqOiRVU0VSX0lEJDoqIl19XSwiaWdub3JlUmF0ZUxpbWl0cyI6ZmFsc2UsInRva2VuSWQiOiIyMDIxMDIxMyIsImltcGVyc29uYXRlZCI6ZmFsc2UsInJlYWxVc2VySWQiOiI2YmRmNjNiZjM4NjllOGU1MjE3NGViZWQ3YTE2NjQzYSIsImlhdCI6MTczODEyNjAwMH0.Vl5Fb9ZB-O-jdLBLC4I8CYjrRJgrHvnjFyAPI3YweomnVnHQpE0hgVP98yTor6DHjCNSLSxSTO-DLPaRbqyBjvxlWNxmBmGGqhNvlItnqegHUsEJ_R3kpUXbe06yb5ysX1efYlTH4T7uQg4xKlS2QP92q6GmyJzw1Z2iEtLZ6DVmM0kJgrdOJVxabSBnOgKeJVEBwiB9JQcegSMl_z3vJwTP1WyE-6ODXVLQh0_kN_gicQ4P3-LFNLAW_iXP0-K23ATPhGb-_cYN7cFqmrSF0pXhiMyN05rqJyHPzJnoYGRvH0asrJxMJw_0bI4DYjPsqHsdQqAmNehPjhRKuceXD6Osh_7t6tRmbXHCTU208DQqhGut7ZBDC_j-Kk8BxD25fexaOhAHeapMSewvJ7S8OF7Nn_PKBQ1C1CZtaEDUaMaARleZO9L7ReiS-UHeAg321abaqzbRkdPWis_feUGqRYupPtZR0uR467RKZ5B_6Tqpd7xx_opjAfsq0NQGgkXCGsW_wKB3BFIzR7EEcgNRCDdbOESX9atKsbMz47OB2CkI2acxroAz3nFI2h3Ij0RQPgDdFeF9WMYdlnW-rDI_QEgJuHvIRfU_I1G2YPzAlXSaMgakylT_2lro4PW0ogooL2hFK8dVr46wAWOJFTGbI5MmexW3sJoScHo-Dei4Qkw";
const ACCOUNT_ID = "34250426-f5ca-4824-85a2-4578fe5d7e37";

export async function GET(req) {
  const startTime = "2025-01-01 00:00:00.000";
  const endTime =
    new Date().toISOString().slice(0, 19).replace("T", " ") + ".000";

  const queryParams = new URLSearchParams({
    updateHistory: "true",
    limit: "1000",
    offset: "0",
  }).toString();

  const url = `https://metastats-api-v1.london.agiliumtrade.ai/users/current/accounts/${ACCOUNT_ID}/historical-trades/${startTime}/${endTime}?${queryParams}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "auth-token": API_TOKEN,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();

    const modifiedData = data.trades.reduceRight((acc, trade) => {
      if (trade.type === "DEAL_TYPE_SELL" || trade.type === "DEAL_TYPE_BUY") {
        const openDate = new Date(trade.openTime);
        const closeDate = new Date(trade.closeTime);

        acc.push({
          id: trade._id,
          type: trade.type === "DEAL_TYPE_SELL" ? "sell" : "buy",
          lots: trade.volume,
          open_time: openDate.toISOString().slice(0, 19) + "Z",
          open_price: trade.openPrice,
          close_time: closeDate.toISOString().slice(0, 19) + "Z",
          close_price: trade.closePrice,
          commission: -Math.abs(trade.marketValue - trade.profit).toFixed(2),
          profit: parseFloat(trade.marketValue.toFixed(2)),
        });
      }
      return acc;
    }, []);

    return new Response(JSON.stringify(modifiedData), {
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
