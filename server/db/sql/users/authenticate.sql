SELECT * FROM "Students" 
WHERE username = ${username} AND password = crypt(${password}, password);