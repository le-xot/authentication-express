import { User } from '../../repositories/user.repository';
import bcrypt from 'bcrypt';

export async function register(username: string, password: string) {
    let user = await User.findOne({ username });

    if (user !== null) {
        return false;
    }

    const hash = await bcrypt.hash(password, 10);

    user = await User.create({
        username,
        password: hash,
    });

    return user;
}
