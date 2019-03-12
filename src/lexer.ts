import { Lexer, createToken } from 'chevrotain'

function escapeRegex(str: string) {
	return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

function createCharacterToken(name: string, character: string) {
	const token = createToken({ name: name, pattern: new RegExp(escapeRegex(character)) });
	token.LABEL = `'${character}'`;
	return token;
}

// --- Character tokens ---
export const LRound = createCharacterToken('LRound', '(');
export const RRound = createCharacterToken('RRound', ')');

export const LCurly = createCharacterToken('LCurly', '{');
export const RCurly = createCharacterToken('RCurly', '}');

export const Comma = createCharacterToken('Comma', ',');
export const Colon = createCharacterToken('Colon', ':');
export const Semicolon = createCharacterToken('Semicolon', ';');
export const Equals = createCharacterToken('Equals', '=');

// --- Literals ---
export const NumberLiteral = createToken({ name: 'NumberLiteral', pattern: /0|[1-9]\d*/ });
export const StringLiteral = createToken({ name: 'StringLiteral', pattern: /'(?:[^\\']|\\(?:[bfnrtv'\\/]|u[0-9a-fA-F]{4}))*'/ });
export const BooleanLiteral = createToken({ name: 'BooleanLiteral', pattern: /(true|false)/ });

// --- Indentifiers ---
export const NamespacedIdentifier = createToken({ name: 'NamespacedIdentifier', pattern: /([a-zA-Z]\w*\.)+[a-zA-Z]\w*/ });
export const Identifier = createToken({ name: 'Identifier', pattern: /[a-zA-Z]\w*/, categories: NamespacedIdentifier, longer_alt: NamespacedIdentifier });

// --- Ignored stuff ---
const WhiteSpace = createToken({
	name: 'WhiteSpace',
	pattern: /\s+/,
	group: Lexer.SKIPPED
});



// --- Initialise lexer ---
export const tokens = [
	WhiteSpace,
	LRound, RRound, LCurly, RCurly,
	Comma, Colon, Semicolon, Equals,
	
	NumberLiteral, StringLiteral, BooleanLiteral,
	NamespacedIdentifier, Identifier
];

export const MyLexer = new Lexer(tokens);