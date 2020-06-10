# NYT Spelling Bee Clone

This app is a clone of the popular NYT game, [Spelling Bee](https://www.nytimes.com/puzzles/spelling-bee). I play the game every day along with the NYT crossword, and as I played started thinking about how the app might have been coded and how I would recreate the game logic. So I was inspired to build a clone! This deployed version is Phase 1, where there is one game available for anyone to play without logging in. Phase 2 is a work in progress, where users will be able to create accounts and log in to play multiple game options. I have been modeling this after the NYT Crossword interface, where users have a variety of puzzles to choose from and can see which games have been completed. This process is underway, stay tuned for an update.

## Technologies

The backend was architected with MongoDB and Express, with basic auth structure using JSON web tokens and bcrypt in tact in anticipation of Phase 2 release. The front end was created with React, and React Router for the Phase 2 work in progress. The game data has been taken from actual NYT spelling bee games that I completed.

## Levels

The poins are based off the NYT rules:

"4-letter words are worth 1 point each.
Longer words earn 1 point per letter.
Each puzzle includes at least one “pangram” which uses every letter. These are worth 7 extra points!"

Levels names are also corresponding to the NYT level and are calculated based on the estimated percentage of total available points.

This has been a fun project and I look forward to finishing the next version of this clone.
