# Debugger Steps

## Breakpoints

- During process of fetching trivia questions from the API
- Submission of the form
- Updating leaderboard list

## Trivia Questions API Fetch

see trivia_questions_api_fetch/ for the screenshots

### Explanation

This part shows the communication with the API to get the trivia questions that will be used. I specifically used line 27 where the code returns response.json() because it was the simplest step of the fetchQuestions() function, and it showed a clear difference in variables compared to the rest.

### What Changed?

After stepping through the breakpoint, the code has now compiled an array of trivia questions to be used later. The biggest visual difference comes in the scope tab of the debugger, where it now lists the array as a variable, that was not there previously.

## Form Submission

see form_submission/ for the screenshots

### Explanation

This is the point in the code when the submit button is finalized, finishing off the quiz, and reloading the page for a new list of questions.

### What Changed?

I had expected more to change, but instead all I saw was a new listed variable within the scope tab. I had expected this to be a bigger spot, where the page reloaded or at least something close to that extent.

## Updating Leaderboard

see updating_leaderboard/ for the screenshots

### Explanation

This spot is during the handling of the localStorage and list of previous scores. I picked this one because it would show that it was working, especially with how the code was handling variables in that function.

### What Changed?

The focus of the code is to reorder the list of previous scores prior to saving them into the localStorage. The breakpoint showed the new score being added to the bottom of the list, but after stepping through, the new score is in the proper position. This is what was expected and shows that the code works as it should.

## Analysis

For the Updating Leaderboard breakpoint, the state actually says a lot about the code. First, the code had to work to be able to show the quiz. Then, the submit button must of worked as intended. Numerous functions, fetches, requests, and returns must have all worked together to even get to the addScore() function. Before the breakpoint, the code needs to interact with the localStorage in order to access the data that is handled at the point of the breakpoint. That means that what needed to work did work. It also shows that the scores need to be repackaged back into the localStorage and then the reload of the page occurs, starting the quiz over again.