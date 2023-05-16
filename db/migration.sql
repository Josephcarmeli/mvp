DROP TABLE IF EXISTS (Users, Posts);

CREATE TABLE Users (
    UserID SERIAL PRIMARY KEY,
    Username VARCHAR(100),
    Email VARCHAR,
    Password VARCHAR(100),
    RegistrationDate TIMESTAMP NOT NULL
);

CREATE TABLE Posts (
    PostID SERIAL PRIMARY KEY,
    UserID INT,
    Title VARCHAR(255),
    Content TEXT,
    PostDate TIMESTAMP NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- CREATE TABLE Comments (
--     CommentID SERIAL PRIMARY KEY,
--     UserID INT,
--     PostID INT,
--     Content TEXT,
--     CommentDate TIMESTAMP NOT NULL,
--     FOREIGN KEY (UserID) REFERENCES Users(UserID),
--     FOREIGN KEY (PostID) REFERENCES Posts(PostID)
-- );