# Contributing to vue-unique-id

## How to contribute code
* Login to GitHub (you need an account)
* Open an issue in the [issue tracker](https://github.com/berniegp/vue-unique-id/issues)
* Fork the main repository from [GitHub](http://github.com/berniegp/vue-unique-id)
* Commit your code and tests in your branch
* Make sure all tests and the lint step pass
* Push your changes to your fork in GitHub
* Open a [pull request](https://github.com/berniegp/vue-unique-id/pulls)

### Branch contents
Please organize the commits in your branches logically. Use squash to combine multiple commits, split bigger changes in multiple commits (or pull requests) when relevant, etc. The general idea is to make it easier for a reviewer to inspect your changes and accept them.

If you are familiar enough with Git to do this, make sure your branch is *rebased* on the target branch (usually *master*) and the commit history is clean so pull requests can be merged with a *fast-forward* merge.

### Runing the unit tests

	$ npm test

All tests must pass and the included lint step must be successful.

## Coding style
The coding style is based on the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) with few modifications.

In general:
* Be consistent with the existing coding style.
* Avoid overly "clever" code unless there's a compelling reason for it.
* Don't be afraid to comment the code and the reasons behind it.
* Use white space.
