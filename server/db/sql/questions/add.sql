INSERT INTO "Questions"
  (type, options, question, answer, explanation, difficulty, category_id, image, option_images, stem_id)
VALUES
  (${type}, ${options}, ${question}, ${answer}, ${explanation}, ${difficulty}, ${category_id}, ${image}, ${option_images}, ${stem_id}) 
RETURNING *