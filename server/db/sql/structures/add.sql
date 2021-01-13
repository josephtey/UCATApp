INSERT INTO "Structure"
  (name, description, type, section_order, time, category_id)
VALUES
  (${name}, ${description}, ${type}, ${section_order}, ${time}, ${category_id})
RETURNING *