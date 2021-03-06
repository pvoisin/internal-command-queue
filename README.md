[![NPM Version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url]

# Command Queue

Command queues have not much on their shoulders so far: they just trigger the "`commandPushed`" & "`commandRemoved`" events when commands are pushed into or removed from them.

<u>Note</u>: Command pattern implementation is based on [command-pattern](https://github.com/pvoisin/command-pattern).

## Example

```javascript
var queue = new CommandQueue();

queue.when("commandPushed", function(command) {
	// Well... do something, please! For example:
	command.execute(function(error, results) {
		queue.remove(command);
	});
});

queue.when("commandRemoved", function() {
	// There you could do something as well.
});
```

[npm-image]: https://img.shields.io/npm/v/internal-command-queue.svg?style=flat
[npm-url]: https://www.npmjs.com/package/internal-command-queue
[travis-image]: https://img.shields.io/travis/pvoisin/internal-command-queue.svg?branch=master
[travis-url]: https://travis-ci.org/pvoisin/internal-command-queue/
[coveralls-image]: https://coveralls.io/repos/pvoisin/internal-command-queue/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/r/pvoisin/internal-command-queue?branch=master