-- mcp/notes-server/seed.sql
-- Datos de prueba. Tres notas, una de ellas "secreta" para validar el scope.
CREATE TABLE IF NOT EXISTS notes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  is_secret INTEGER NOT NULL DEFAULT 0
);

INSERT INTO notes (title, body, is_secret) VALUES
  ('Setup repo', 'gh repo create + .gitignore primero. node_modules no commiteado.', 0),
  ('Branch protection', 'gh api PUT branches/main/protection con required_approving_review_count=1', 0),
  ('API key staging', 'sk_test_NOT-A-REAL-KEY-just-for-the-lab', 1);