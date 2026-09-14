/**
 * @file A tree-sitter definition of the CW engine language
 * @author Adrian Covaci <6562353+acovaci@users.noreply.github.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

export default grammar({
  name: "witze",

  conflicts: ($) => [[$.predicate, $.collection]],

  extras: ($) => [
    /\s/, // whitespace
    $.comment,
  ],

  supertypes: ($) => [$.literal, $.number],

  rules: {
    source_file: ($) => choice($.content_file, $.localisation_file),
    content_file: ($) => repeat1($.definition),
    localisation_file: ($) => $.language_localisation,

    collection: ($) => seq("{", repeat($.literal), "}"),

    predicate: ($) => seq("{", repeat($.definition), "}"),

    definition: ($) =>
      choice(
        $._primitive_definition,
        $._composite_definition,
        $._id_definition,
      ),

    _primitive_definition: ($) =>
      seq(field("key", $.identifier), "=", field("value", $._value)),

    _id_definition: ($) => seq(field("key", "id"), "=", field("value", $.id)),

    _composite_definition: ($) =>
      seq(field("operand", $.logical_operator), "=", $.predicate),

    _value: ($) =>
      choice($.literal, $.predicate, $.collection, $.identifier, $.member),

    member: ($) =>
      seq(
        field("parent", $.identifier),
        ".",
        field("member", choice($.identifier, $.member)),
      ),

    id: ($) =>
      seq(
        field("namespace", $.identifier),
        ".",
        field("id_number", $.id_number),
      ),
    id_number: ($) => $._positive_integer,
    identifier: ($) => /[a-zA-Z_]+/,

    logical_operator: ($) => choice("NOT", "NOR", "OR"),

    literal: ($) => choice($.string, $.number, $.boolean),
    string: ($) => /"[^"]*"/,
    number: ($) => choice($.integer, $.decimal),
    integer: ($) => choice($._positive_integer, $._negative_integer),
    _positive_integer: ($) => /\d+/,
    _negative_integer: ($) => /-\d+/,
    decimal: ($) => /-?\d+\.\d+/,
    boolean: ($) => choice("yes", "no"),

    comment: ($) => token(seq("#", /.*/)),

    // LOCALISATION

    language_localisation: ($) =>
      seq($.language_identifier, ":", $._localisation_definitions),
    language_identifier: ($) => token(prec(1, /l_[a-z_]+/)),
    _localisation_definitions: ($) => repeat1($.localisation_definition),
    localisation_definition: ($) =>
      seq(
        field("localisation_key", $.identifier),
        ":",
        optional($._positive_integer),
        field("localisation_string", $.localisation_string),
      ),
    localisation_string: ($) =>
      seq(
        '"',
        repeat(choice($._localisation_string_content, $.interpolation)),
        '"',
      ),
    _localisation_string_content: ($) => token(prec(-1, /[^$"]+/)),
    interpolation: ($) => seq("$", $.identifier, "$"),
  },
});
