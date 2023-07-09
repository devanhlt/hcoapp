export interface ConfigBaseProps {
  catchErrors: "always" | "dev" | "prod" | "never"
}

const BaseConfig: ConfigBaseProps = {
  /**
   * Only enable if we're catching errors in the right environment
   */
  catchErrors: "always",
}

export default BaseConfig
