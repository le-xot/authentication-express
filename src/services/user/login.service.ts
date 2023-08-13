import { User } from '../../repositories/user.repository';
import bcrypt from 'bcrypt';

export async function login(username: string, password: string) {
    const user = await User.findOne({ username });

    if (!user) {
        console.log('Нет такого пользователя!');
        return false;
    }

    if (!bcrypt.compareSync(password, user.password)) {
        console.log(`Неверный пароль`);
        return false;
    }

    return user;
}
