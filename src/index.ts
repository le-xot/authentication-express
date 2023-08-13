import { app } from './app';
import { connectDatabase } from './services/database/db.service';
import { applicationPort } from './services/config/environment.service';

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
