INSERT INTO "Structure"
  (name, description, type, section_order, time)
VALUES
  (${name}, ${description}, ${type}, ${section_order}, ${time})
RETURNING *