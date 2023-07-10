const Environments = {
  dev: {
    catchErrors: "alway",
    API_URL: "https://system-test.baspro.vn",
  },
  test: {
    catchErrors: "alway",
    API_URL: "https://system-test.baspro.vn",
  },
  staging: {
    catchErrors: "alway",
    API_URL: "https://system-test.baspro.vn",
  },
  prod: {
    catchErrors: "alway",
    API_URL: "https://system-test.baspro.vn",
  },
}

export const configOf = (env: string) => {
  return Environments[env]
}
