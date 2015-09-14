var spy = require("sinon").spy;
var expect = require("expect.js");

var Command = require("../../source/Command");
var CommandQueue = require("../../source/CommandQueue");

describe("CommandQueue", function() {
	describe("#push", function() {
		it("should only accept instances of Command", function() {
			var queue = new CommandQueue();

			expect(function() {
				queue.push(NaN);
			}).to.throwError("Invalid command!");
		});

		it("should store commands in the order they arrive", function() {
			var queue = new CommandQueue();

			var iterationsCount = 10;
			for(var index = 0; index < iterationsCount; index++) {
				var command = new Command("C" + index);
				queue.push(command);
				expect(queue.own.commands.length).to.be(index + 1);
				expect(queue.own.commands[index]).to.be(command);
			}
		});

		it("should emit the \"commandPushed\" event for every command added", function() {
			var queue = new CommandQueue();

			var observers = {
				"commandPushed": spy()
			};

			queue.on("commandPushed", observers["commandPushed"]);

			for(var index = 0; index < 10; index++) {
				var command = new Command("C" + index);
				queue.push(command);
				expect(observers["commandPushed"].callCount).to.be(index + 1);
				expect(observers["commandPushed"].args[index][0]).to.be(command);
			}
		});
	});

	describe("#remove", function() {
		it("should only accept instances of Command", function() {
			var queue = new CommandQueue();

			expect(function() {
				queue.remove(NaN);
			}).to.throwError("Invalid command!");
		});

		it("should emit the \"commandRemoved\" event for every command removed", function() {
			var queue = new CommandQueue();

			var observers = {
				"commandRemoved": spy()
			};

			queue.on("commandRemoved", observers["commandRemoved"]);

			var commands = [];
			for(var index = 0; index < 10; index++) {
				var command = new Command("C" + index);
				queue.push(command);
				commands.push(command);
			}

			var iterationsCount = 10;
			for(index = 0; index < iterationsCount; index++) {
				var command = commands[index];
				queue.remove(command);
				expect(observers["commandRemoved"].callCount).to.be(index + 1);
				expect(observers["commandRemoved"].args[index][0]).to.be(command);
				expect(queue.own.commands.length).to.be(iterationsCount - (index + 1));
				expect(queue.own.commands[0]).to.not.be(command);
			}
		});

		it("should not emit the \"commandRemoved\" event for commands that were not pushed before", function() {
			var queue = new CommandQueue();

			var observers = {
				"commandRemoved": spy()
			};

			queue.on("commandRemoved", observers["commandRemoved"]);

			var commands = [];
			var iterationsCount = 10;
			for(var index = 0; index < iterationsCount; index++) {
				commands.push(new Command("C" + index));
			}

			for(index = 0; index < iterationsCount; index++) {
				var command = commands[index];
				queue.remove(command);
				expect(observers["commandRemoved"].callCount).to.be(0);
				expect(queue.own.commands.length).to.be(0);
			}
		});
	});
});