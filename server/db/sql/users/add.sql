INSERT INTO "Students"
  (username, roles, display_name)
VALUES
  (${username}, ${roles}, ${display_name})
RETURNING *