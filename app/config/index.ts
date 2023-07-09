const Environments = {
  dev: {
    catchErrors: "alway",
    API_URL: "https://api.rss2json.com/v1/",
  },
  test: {
    catchErrors: "alway",
    API_URL: "https://api.rss2json.com/v1/",
  },
  stag: {
    catchErrors: "alway",
    API_URL: "https://api.rss2json.com/v1/",
  },
  prod: {
    catchErrors: "alway",
    API_URL: "https://api.rss2json.com/v1/",
  },
}

export const configOf = (env: string) => {
  return Environments[env]
}
