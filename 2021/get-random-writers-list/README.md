## Generate random writers list

Reads the `input.txt` and shuffles all the rows using the [Durstenfeld shuffle](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm), an optimized version of [Fisher-Yates](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle). Returns the shuffled list, as well as a Map containing the amount of times each input would be put in the first (0) position of the generated list.
