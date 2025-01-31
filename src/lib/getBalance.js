const API_TOKEN =
  "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YmRmNjNiZjM4NjllOGU1MjE3NGViZWQ3YTE2NjQzYSIsInBlcm1pc3Npb25zIjpbXSwiYWNjZXNzUnVsZXMiOlt7ImlkIjoidHJhZGluZy1hY2NvdW50LW1hbmFnZW1lbnQtYXBpIiwibWV0aG9kcyI6WyJ0cmFkaW5nLWFjY291bnQtbWFuYWdlbWVudC1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciIsIndyaXRlciJdLCJyZXNvdXJjZXMiOlsiKjokVVNFUl9JRCQ6KiJdfSx7ImlkIjoibWV0YWFwaS1yZXN0LWFwaSIsIm1ldGhvZHMiOlsibWV0YWFwaS1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciIsIndyaXRlciJdLCJyZXNvdXJjZXMiOlsiKjokVVNFUl9JRCQ6KiJdfSx7ImlkIjoibWV0YWFwaS1ycGMtYXBpIiwibWV0aG9kcyI6WyJtZXRhYXBpLWFwaTp3czpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciIsIndyaXRlciJdLCJyZXNvdXJjZXMiOlsiKjokVVNFUl9JRCQ6KiJdfSx7ImlkIjoibWV0YWFwaS1yZWFsLXRpbWUtc3RyZWFtaW5nLWFwaSIsIm1ldGhvZHMiOlsibWV0YWFwaS1hcGk6d3M6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbIio6JFVTRVJfSUQkOioiXX0seyJpZCI6Im1ldGFzdGF0cy1hcGkiLCJtZXRob2RzIjpbIm1ldGFzdGF0cy1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciIsIndyaXRlciJdLCJyZXNvdXJjZXMiOlsiKjokVVNFUl9JRCQ6KiJdfSx7ImlkIjoicmlzay1tYW5hZ2VtZW50LWFwaSIsIm1ldGhvZHMiOlsicmlzay1tYW5hZ2VtZW50LWFwaTpyZXN0OnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIiwid3JpdGVyIl0sInJlc291cmNlcyI6WyIqOiRVU0VSX0lEJDoqIl19LHsiaWQiOiJjb3B5ZmFjdG9yeS1hcGkiLCJtZXRob2RzIjpbImNvcHlmYWN0b3J5LWFwaTpyZXN0OnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIiwid3JpdGVyIl0sInJlc291cmNlcyI6WyIqOiRVU0VSX0lEJDoqIl19LHsiaWQiOiJtdC1tYW5hZ2VyLWFwaSIsIm1ldGhvZHMiOlsibXQtbWFuYWdlci1hcGk6cmVzdDpkZWFsaW5nOio6KiIsIm10LW1hbmFnZXItYXBpOnJlc3Q6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbIio6JFVTRVJfSUQkOioiXX0seyJpZCI6ImJpbGxpbmctYXBpIiwibWV0aG9kcyI6WyJiaWxsaW5nLWFwaTpyZXN0OnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIl0sInJlc291cmNlcyI6WyIqOiRVU0VSX0lEJDoqIl19XSwiaWdub3JlUmF0ZUxpbWl0cyI6ZmFsc2UsInRva2VuSWQiOiIyMDIxMDIxMyIsImltcGVyc29uYXRlZCI6ZmFsc2UsInJlYWxVc2VySWQiOiI2YmRmNjNiZjM4NjllOGU1MjE3NGViZWQ3YTE2NjQzYSIsImlhdCI6MTczODIyNzAwM30.aFCUpCAlT1i3usNgOqZbBOXZRJiH6pwpuVrOMJsiNvFw1n4haqdxyotipgZom1NN1Ypyr955TXdkjZEOrJMVfDTx5xlvMYcnxwPwq1vVMs9wlndFSRy80ceIA9bF98WDZz23RohwbkFGFroQrx9OXebQ0keIBfSNkiwFl6JyA5SnGxGZXW6-KdGBj-HU8LQAKWsOrWJeey5sWwm0sATCFv-9DiZ6czAKrNetC4SoRw68dSIXoqXTXa-7pfk5vw7VC3dE0FwivEWasJHp7V80QKEppQhQ5Jn4YokksK8V7tQssAorEz0zl59lbmFn1TLUy8yqXiDgcojtLwvtO8pQ6JpSrcn5H6tUy4gxLonSX13d_u1bdY1rkjRVzrUNqAPZ9xCtgG3RRKhHjyfO1fyn6VotaiYoQPHNxWXm08xa3Dk49b44eq3MwYEtt-u53R2GhcfCsU1Dk0TgzB0kX7Krrjb2GEIDSTejBJ_nIyXk8eL7ci-3DIkTIXAl4aHvk3Y4oodpCHrnfMoxpa1OnJE43_CtlumEWlWUkfa4wHIHmr8kI1ubeGDajppa1BFP9IirObgebyg8CmNdLaLckTzLHBGyAeGsyC39hZEL99_qaTkKcTUFbD9GUOAXOh99fUp31liWpJpcZTLWcAfqyeK-HHtg8zVmOW2rY3Cb4RKdcvA";

async function fetchWithTimeout(url, timeoutMs = 2000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "auth-token": API_TOKEN,
        Accept: "application/json",
      },
      signal: controller.signal,
    });
    clearTimeout(timeout);
    return res;
  } catch (error) {
    clearTimeout(timeout);
    throw error;
  }
}

export async function getBalance(accountId) {
  const url = `https://mt-client-api-v1.london.agiliumtrade.ai/users/current/accounts/${accountId}/account-information`;

  try {
    const response = await fetchWithTimeout(url);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.balance;
  } catch (error) {
    console.error("Error fetching balance:", error.message);
    const message =
      error.name === "AbortError"
        ? "Request timed out"
        : "Failed to fetch balance from the API";
    throw new Error(`${message} (details: ${error.message})`);
  }
}
