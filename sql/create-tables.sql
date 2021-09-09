DROP TABLE if EXISTS users;
DROP TABLE if EXISTS schedules;

CREATE TABLE users(
    user_id VARCHAR(255),
    surname VARCHAR(255) NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
)

CREATE TABLE schedules(
    schedule_id VARCHAR(255) GENERATED ALWAYS AS IDENTITY,
    user_id VARCHAR(255) NOT NULL,
    day VARCHAR(255) NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    PRIMARY KEY(schedule_id)
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
            REFERENCES users(user_id)
            ON DELETE CASCADE
)

