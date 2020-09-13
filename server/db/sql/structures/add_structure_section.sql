INSERT INTO "Structures_Sections"
  (structure_id, section_id)
VALUES
  (${structure_id}, ${section_id})
RETURNING *