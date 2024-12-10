import { strict as assert } from "node:assert";
import { test } from "node:test";
import { count_spaces, trim_spaces, unindent } from "./unindent.js"


test("count_spaces", () => {

    assert.equal(count_spaces("Hello"), 0);
    assert.equal(count_spaces("  Hello"), 2);
    assert.equal(count_spaces("\tHello"), 4);
    assert.equal(count_spaces(" \tHello"), 4);
    assert.equal(count_spaces("  \tHello"), 4);
    assert.equal(count_spaces("   \tHello"), 4);
    assert.equal(count_spaces("    \tHello"), 8);
    assert.equal(count_spaces("    "), undefined);
    assert.equal(count_spaces("\t"), undefined);
    assert.equal(count_spaces("  \t  "), undefined);
});

test("trim_spaces", () => {
    assert.equal(trim_spaces("Hello", 0), "Hello");
    assert.equal(trim_spaces("    Hello", 2), "  Hello");
    assert.equal(trim_spaces("\tHello", 4), "Hello");
    assert.equal(trim_spaces("  \tHello", 4), "Hello");
    assert.equal(trim_spaces("  \tHello", 3), " Hello");
    assert.equal(trim_spaces("\t\t\tHello", 10), "  Hello");
    assert.equal(trim_spaces("        ", 4), "    ");
    assert.equal(trim_spaces("        ", 50), "");
    assert.equal(trim_spaces("  \t\t\t   ", 50), "");
});

test("unindent, all equal", () => {
    assert.equal(unindent("  x\n  y\n  z\n"), "x\ny\nz\n");
});

test("unindent, mixed depth", () => {
    assert.equal(unindent("  x\n    y\n  z\n"), "x\n  y\nz\n");
});

test("unindent, with blank lines depth", () => {
    assert.equal(unindent("  x\n\n  z\n"), "x\n\nz\n");
});