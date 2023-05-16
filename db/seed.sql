INSERT INTO Users (Username, Email, Password, RegistrationDate) 
VALUES ('John Doe', 'johndoe@example.com', 'password123', CURRENT_TIMESTAMP);

INSERT INTO Users (Username, Email, Password, RegistrationDate) 
VALUES ('Jane Smith', 'janesmith@example.com', 'password456', CURRENT_TIMESTAMP);

INSERT INTO Posts (UserID, Title, Content, PostDate)
VALUES (59, 'First Post', 'This is my first post.', '2023-05-15 10:00:00');

INSERT INTO Comments (UserID, PostID, Content, CommentDate)
VALUES (59, 59, 'Great post!', '2023-05-15 10:15:00');