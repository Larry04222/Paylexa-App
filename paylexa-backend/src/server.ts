import { app } from "./app";
import { envConfig } from "./config/env";

const port = envConfig.port;

app.listen(port, () => {
  console.log(`🚀 Paylexa backend running on port ${port}`);
});
