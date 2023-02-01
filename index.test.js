const removeDuplicates = require(".");

describe("remove duplicates", () => {
  describe("simple cases", () => {
    test("no duplicate object nest level 1", () => {
      const inputObject = {
        a: 1,
        b: "b",
      };
      const output = removeDuplicates(inputObject);
      console.debug(output);
      expect(output.a).toBe(1);
      expect(output.b).toBe("b");
    });
    test("no duplicate object nest level 2", () => {
      const inputObject = {
        a: 1,
        b: 2,
        c: {
          a: 1,
        },
      };
      const output = removeDuplicates(inputObject);
      console.debug(output);
      expect(output.a).toBe(1);
      expect(output.b).toBe(2);
      expect(output.c.a).toBe(1);
    });
    test("no duplicate object nest level 3", () => {
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
      expect(output.a).toBe(1);
      expect(output.b).toBe(2);
      expect(output.c.d.a).toBe(1);
    });
    test("2 same object in the same level", () => {
      const duplicateObj = {
        b: "b",
        c: "c",
      };
      const inputObject = {
        a: duplicateObj,
        d: "d",
        e: duplicateObj,
      };
      const output = removeDuplicates(inputObject);
      console.debug(output);
      expect(output.a.b).toBe("b");
      expect(output.a.c).toBe("c");
      expect(output.d).toBe("d");
      expect(output.e).toBe(undefined);
    });
    test("2 same objects in the different level", () => {
      const duplicateObj = {
        b: "b",
        c: "c",
      };
      const inputObject = {
        a: duplicateObj,
        b: {
          c: "c",
          d: duplicateObj,
        },
      };
      const output = removeDuplicates(inputObject);
      console.debug(output);
      expect(output.a.b).toBe("b");
      expect(output.b.c).toBe("c");
      expect(output.b.d).toBeUndefined();
    })
  });

  describe("complicated cases", () => {
    test("2 kinds of duplicated objects", () => {
      const duplicateOne = {
        a: "a",
      };
      const duplicateTwo = {
        b: "b",
        c: "c",
      };
      const inputObject = {
        a: "a",
        b: duplicateOne,
        c: {
          d: {
            e: "e",
            duplicateOne,
            f: duplicateTwo,
          },
        },
        d: "d",
        e: {
          e: "e",
          duplicateTwo,
        },
      };
      const output = removeDuplicates(inputObject);
      console.debug(output);
      expect(output.b.a).toBe("a");
      expect(output.c.d.e === "e");
      expect(output.c.d.a).toBeUndefined();
      expect(output.c.d.f.b).toBe("b");
      expect(output.e.e).toBe("e");
      expect(output.e.b).toBeUndefined();
    });
  });
});
