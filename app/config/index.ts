const Environments = {
  dev: {
    catchErrors: "alway",
    API_URL: "https://dms-api-test.baspro.vn/",
    STORAGE_URL: "https://dms-api-test.baspro.vn/api/services/app/File/",
  },
  test: {
    catchErrors: "alway",
    API_URL: "https://dms-api-test.baspro.vn/",
    STORAGE_URL: "https://dms-api-test.baspro.vn/api/services/app/File/",
  },
  staging: {
    catchErrors: "alway",
    API_URL: "https://dms-api-staging.baspro.vn/",
    STORAGE_URL: "https://dms-api-staging.baspro.vn/api/services/app/File/",
  },
  prod: {
    catchErrors: "alway",
    API_URL: "https://dms-api.tapdoandaiviet.com.vn",
    STORAGE_URL: "https://dms-api.tapdoandaiviet.com.vn/api/services/app/File/",
  },
}

export const configOf = (env: string) => {
  return Environments[env]
}
