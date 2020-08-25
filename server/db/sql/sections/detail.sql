SELECT * FROM "Sections_Questions" A 
INNER JOIN "Questions" B ON A.question_id = B.question_id 
WHERE A.section_id = ${section_id}