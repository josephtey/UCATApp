UPDATE "Structure" 
SET section_order = section_order || ${section_id}
WHERE structure_id = ${structure_id};

INSERT INTO "Structures_Sections" (structure_id, section_id)
VALUES (${structure_id}, ${section_id})
RETURNING *
