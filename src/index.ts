import app from "./app";
import { connectDatabase } from "./server/db.service";
import { client } from "./server/redis.service";
import environment from "./services/environment.service";

const { applicationPort } = environment;

async function bootstrap() {
  try {
    await connectDatabase();

    app.listen(applicationPort);
  } catch (error) {
    console.log(error);
  }

  console.log(`http://localhost:${applicationPort}/`);
}

bootstrap();
