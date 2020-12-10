DROP TABLE IF EXISTS cybertrucks;

CREATE TABLE cybertrucks (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    descript TEXT NOT NULL,
    color TEXT NOT NULL
); 
