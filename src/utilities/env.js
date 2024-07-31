import { object, string } from "yup";

const createEnv = () => {
  const EnvSchema = object({
    API_URL: string().required(),
  });

  const envVars = Object.entries(import.meta.env).reduce((envs, curr) => {
    const [key, value] = curr;
    if (key.startsWith("VITE_APP_")) {
      envs[key.replace("VITE_APP_", "")] = value;
    }
    return envs;
  }, {});

  try {
    return EnvSchema.validateSync(envVars, { abortEarly: false });
  } catch (error) {
    const validationErrors = error.inner
      .map((data) => `${data.path}`)
      .join(", ")
      .trim();

    throw new Error(
      `Invalid env provided. The following variables are missing or invalid: ${validationErrors}`
    );
  }
};

export const env = createEnv();
