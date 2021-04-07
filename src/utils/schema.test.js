import schema from './schema';
import * as assert from "assert";

describe("test schema", () => {
  test("valid schema", () => {
    schema.validate({ name: 'Ashish' }).then((value) => {
      assert.deepStrictEqual({ name: 'Ashish' }, value);
    });
  });

  test("invalid schema", () => {
    schema.validate({ name: '' }).then((value) => {
      assert.deepStrictEqual({ name: 'Ashish' }, value);
    }).catch((error) => {
      console.log(error)
    });
  });
});