SELECT * FROM "Structures_Sections" A 
INNER JOIN "Sections" B ON A.section_id = B.section_id 
WHERE A.structure_id = ${structure_id}