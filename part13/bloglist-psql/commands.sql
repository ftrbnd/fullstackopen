CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

INSERT INTO blogs (author, url, title, likes) values ('Meta', 'https://react.dev', 'React', 20);
INSERT INTO blogs(author, url, title, likes) values ('Meta', 'https://reactnative.dev', 'React Native', 1);
INSERT INTO blogs(author, url, title, likes) values ('Vercel', 'https://nextjs.org/', 'Next.js', 12);
