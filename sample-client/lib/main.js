import Analytics from "analytics";

const post = (url, data) => {
  return fetch(url, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data),
  })
};

/* Initialize analytics */
export const fromDomain = (domain) => {
  return Analytics({
    app: "my-analytics",
    version: 100,
    plugins: [
      {
        name: "my-analytics-plugin",
        page: ({ payload, config }) => {
          console.log("page", payload);
          post(domain, payload);
        },
        identify: ({ payload, config }) => {
          console.log("page", payload);
          post(domain, payload);
        },
        track: ({ payload, config }) => {
          console.log("page", payload);
          post(domain, payload);
        },
      },
    ],
  });
};
