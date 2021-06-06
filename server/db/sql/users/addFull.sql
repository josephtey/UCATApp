INSERT INTO "Students"
  (username, password, display_name, type, company_id)
VALUES
  (${username}, crypt(${password}, gen_salt('bf')), ${display_name}, ${type}, ${company_id})
RETURNING *