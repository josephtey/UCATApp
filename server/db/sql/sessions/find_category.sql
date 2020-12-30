SELECT A.session_id, A.start_time, A.end_time, A.score, A.completed, A.score_breakdown FROM "Sessions" A 
INNER JOIN "Structure" B ON A.structure_id = B.structure_id
WHERE B.category_id = ${category_id} AND A.student_id = ${student_id}