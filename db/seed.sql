CREATE TABLE helo_users(
id SERIAL PRIMARY KEY,
username VARCHAR (64) NOT NULL,
password VARCHAR(64) NOT NULL,
profile_pic TEXT
);

CREATE TABLE helo_posts(
id SERIAL PRIMARY KEY,
title VARCHAR (45) NOT NULL,
content TEXT,
image TEXT,
author_id INT REFERENCES helo_users(id),
date_created TIMESTAMP
)

