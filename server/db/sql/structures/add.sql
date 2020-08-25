INSERT INTO "Structure"
  (name, description, type, section_order)
VALUES
  (${name}, ${description}, ${type}, ${section_order})
RETURNING *