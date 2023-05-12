INSERT INTO Users (Username, Email, Password, RegistrationDate) 
VALUES ('John Doe', 'johndoe@example.com', 'password123', CURRENT_TIMESTAMP);

INSERT INTO Users (Username, Email, Password, RegistrationDate) 
VALUES ('Jane Smith', 'janesmith@example.com', 'password456', CURRENT_TIMESTAMP);

-- Insert data into Posts
INSERT INTO Posts (UserID, Title, Content, PostDate) 
VALUES (1, 'My First Post', 'This is the content of my first post.', CURRENT_TIMESTAMP);

INSERT INTO Posts (UserID, Title, Content, PostDate) 
VALUES (2, 'Jane''s First Post', 'This is the content of Jane''s first post.', CURRENT_TIMESTAMP);

-- Insert data into Comments
INSERT INTO Comments (UserID, PostID, Content, CommentDate) 
VALUES (2, 1, 'Nice post, John!', CURRENT_TIMESTAMP);

INSERT INTO Comments (UserID, PostID, Content, CommentDate) 
VALUES (1, 2, 'Great post, Jane!', CURRENT_TIMESTAMP);