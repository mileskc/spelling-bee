# NYT Spelling Bee Clone

[Spelling Bee Clone Live Site](spelling-bee-clone.surge.sh)

This app is a clone of the popular NYT game, [Spelling Bee](https://www.nytimes.com/puzzles/spelling-bee). I play the game every day along with the NYT crossword, and as I played I started thinking about how I might recreate the game logic. So I was inspired to build a clone! This deployed version is Phase 2, where users are be able to create accounts and log in to play multiple game options. I have been modeling this after the NYT Crossword interface, where users have a variety of puzzles to choose from and can see which games have been completed. Phase 1 displayed one game available for anyone to play without logging in. That is still an option for users who don't wish to create an account. The next steps for this project will be to add more styling features, some extra logic to allow for tracking played games and to refactor code.

![Live Site Image](https://i.imgur.com/UfdPJkG.png)

## Technologies

The backend was architected with MongoDB and Express, with basic auth structure using JSON web tokens and bcrypt. The front end was created with React Router and the game data has been taken from actual NYT spelling bee games that I completed. I considered using a dictionary API to create the games but ultimately determined that this would be the most efficient way to customize the data how I wanted it.

## Gameplay

The object of the game is to find as many words as possible that are 4 letters or longer and include the center yellow letter. In every game there is at least one pangram that uses all of the letters in the hive. Letters can be repeated in words, and pangrams might include repeated letters. Users have the option to type in the input box or to click on the letters in the hive. 

## Levels

The points are based off the NYT rules:

"4-letter words are worth 1 point each.
Longer words earn 1 point per letter.
Each puzzle includes at least one “pangram” which uses every letter. These are worth 7 extra points!"

Level names correspond to the NYT levels and are calculated based on the estimated percentage of total available points.

This has been a fun project and I look forward to finishing the next version of this clone.
