import * as bcrypt from 'bcryptjs';

async function testAuth() {
  // Пароль из БД (скопируйте хеш из вашей БД)
  const hashedPassword = '$2b$10$ayrs0GACxVdAw.KvEYmrseGnc45EeF8BsPi5iHQQjZSV5teJ3VeFy';
  
  // Пароль, который вы вводите при логине
  const inputPassword = 'admin123';
  
  // Проверяем совпадение
  const isMatch = await bcrypt.compare(inputPassword, hashedPassword);
  
  console.log('Пароль совпадает:', isMatch);
}

testAuth();