import { MyLexer } from './lexer';
import MyParser from './parser';

const parser = new MyParser();
const inputs = [
	"aliasA = FunctionA('parameter');",
	"aliasB = aliasA;",
	"aliasC = aliasA, FunctionA('parameter');",
	"aliasD = FunctionA('parameter'), FunctionB('parameter');"
];

inputs.forEach(input => {
	const lexingResult = MyLexer.tokenize(input);
	console.log(`Input: "${input}"`);
	
	lexingResult.errors.forEach(console.log);
	
	parser.input = lexingResult.tokens;
	const cst = parser.aliasDefinition();
	
	parser.errors.forEach(error => {
		console.error(`${error.name}: ${error.message}`);
		console.warn(`\tAt line: ${error.token.startLine}`);
		console.warn(`\tAt column: ${error.token.startColumn}`);
		console.warn(`\tContext: ${error.context.ruleStack}`);
	});
	
	if (lexingResult.errors.length === 0 && parser.errors.length === 0) {
		console.log('All good');
	}
	
	console.log();
	console.log();
});