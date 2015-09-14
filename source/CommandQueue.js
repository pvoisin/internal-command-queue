var inherit = require("util").inherits;
var Observable = require("./Observable");
var Command = require("./Command");


function CommandQueue() {
	Observable.call(this);

	var self = this, own = self.own = {
		commands: []
	};
}

inherit(CommandQueue, Observable);


CommandQueue.prototype.push = function push(command) {
	var self = this, own = self.own;

	if(!(command instanceof Command)) {
		throw new Error("Invalid command!");
	}

	own.commands.push(command);

	self.notify("commandPushed", command);
};

CommandQueue.prototype.remove = function remove(command) {
	var self = this, own = self.own;

	if(!(command instanceof Command)) {
		throw new Error("Invalid command!");
	}

	var index = own.commands.indexOf(command);
	if(index > -1) {
		own.commands.splice(index, 1);
		self.notify("commandRemoved", command);
	}
};


CommandQueue.Command = Command;

module.exports = CommandQueue;