SELECT * FROM helo_users
WHERE username = ($1)
RETURNING *;