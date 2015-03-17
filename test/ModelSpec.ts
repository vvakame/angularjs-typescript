"use strict";

import assert = require("power-assert");
import Model = require("../scripts/Model");

describe("Modelの", ()=> {
	it("newできる", () => {
		var obj = new Model("{\"test\":\"Hi!\"}");
		assert(obj.test === "Hi!");
	});
});
