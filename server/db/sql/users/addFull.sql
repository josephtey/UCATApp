INSERT INTO "Students"
  (username, password, display_name, type, company_id)
VALUES
  (${username}, ${password}, ${display_name}, ${type}, ${company_id})
RETURNING *