# Debugger Steps

## Breakpoints

- During process of fetching trivia questions from the API
- Submission of the form
- Updating leaderboard list

## Trivia Questions API Fetch

### Explanation

This part shows the communication with the API to get the trivia questions that will be used. I specifically used line 27 where the code returns response.json() because it was the simplest step of the fetchQuestions() function, and it showed a clear difference in variables compared to the rest.

### What Changed?

After stepping through the breakpoint, the code has now compiled an array of trivia questions to be used later. The biggest visual difference comes in the scope tab of the debugger, where it now lists the array as a variable, that was not there previously.

## Form Submission

### Explanation



### What Changed?



## Updating Leaderboard

### Explanation



### What Changed?



## Analysis