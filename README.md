# Witze grammar for tree-sitter

This repository contains the Tree-sitter grammar definition of a language we'll
call **Witze**, that follows the same structure and definition of the scripting
language used by the [Clausenwitz engine][wikipedia-clausewitz], developed by
[Paradox Interactive][paradox].

**Right now,** Witze is fully compatible with the scripting language used by the
game engine.

The Witze language is not defined to be _identical_ to the scripting,
language, but is a superset of it, for a number of reasons, including:

- Flexibility and extensibility
- Possibility of adding pre-processors

If the language ever diverges, tooling to generate the latter will be available.

## Intended audience

This grammar is the basis for developer tooling for creating mods for games that
use the Clausewitz engine, such as:

- [Stellaris][stellaris]
- [Hearts of Iron IV][hearts-of-iron-4]
- [Star Trek Infinite][star-trek-infinite]

[wikipedia-clausewitz]: https://en.wikipedia.org/wiki/Paradox_Development_Studio#Clausewitz_Engine
[paradox]: https://www.paradoxinteractive.com/
[stellaris]: https://www.paradoxinteractive.com/games/stellaris/about
[hearts-of-iron-4]: https://www.paradoxinteractive.com/games/hearts-of-iron-iv/about
[star-trek-infinite]: https://www.paradoxinteractive.com/games/star-trek-infinite/about
