const removeDuplicates = require(".");

describe("remove duplicates", () => {
  describe("simple cases", () => {
    test("no duplicate", () => {
      const inputObject = {
        a: 1,
        b: "b",
      };
      const output = removeDuplicates(inputObject);
      console.debug(output);
      expect(output.a === 1);
      expect(output.b === "b");
    });
    test("nest level 2", () => {
      const inputObject = {
        a: 1,
        b: 2,
        c: {
          a: 1,
        },
      };
      const output = removeDuplicates(inputObject);
      console.debug(output);
      expect(output.a == 1);
      expect(output.b === 2);
      expect(output.c.length === 0);
    });
    test("nest level 3", () => {
      const inputObject = {
        a: 1,
        b: 2,
        c: {
          d: {
            a: 1,
          },
        },
      };
      const output = removeDuplicates(inputObject);
      console.debug(output);
      expect(output.a === 1);
      expect(output.b === 2);
      expect(output.c.d.length === 0);
    });
  });

  describe("complicated cases", () => {
    test("nest level 3", () => {
      const inputObject = {
        a: "a",
        b: {
          a: "a",
        },
        c: {
          d: {
            e: "e",
          },
        },
        d: "d",
        e: "e",
      };
      const output = removeDuplicates(inputObject);
      console.debug(output);
      expect(output.a === "a");
      expect(output.b.length === 0);
      expect(output.c.d.e === "e");
      expect(output.d === "d");
      expect(output.e === undefined);
    });
  });
});
