INSERT INTO "Responses"
  (value, flagged, committed, session_id, student_id, question_id)
VALUES
  (${value}, ${flagged}, false, ${session_id}, ${student_id}, ${question_id}) 
RETURNING *