import { Parser } from 'chevrotain'
import * as Lexer from './lexer'

export default class MyParser extends Parser {
	
	constructor() {
		super(Lexer.tokens);
		this.performSelfAnalysis();
	}
	
	public aliasDefinition = this.RULE('aliasDefinition', () => {
		this.CONSUME1(Lexer.Identifier);
		this.CONSUME(Lexer.Equals);
		
		this.AT_LEAST_ONE_SEP({
			SEP: Lexer.Comma,
			DEF: () => {
				this.OR([
					{ ALT: () => this.SUBRULE(this.fullCallInvocation) },
					{ ALT: () => this.CONSUME2(Lexer.Identifier) },
				]);
			}
		});
		
		this.CONSUME(Lexer.Semicolon);
	});
	
	private fullCallInvocation = this.RULE('fullCallInvocation', () => {
		this.CONSUME(Lexer.NamespacedIdentifier);
		this.CONSUME(Lexer.LRound);
		this.MANY_SEP({
			SEP: Lexer.Comma,
			DEF: () => this.SUBRULE(this.fullCallParameter)
		});
		this.CONSUME(Lexer.RRound);
	});
	
	private fullCallParameter = this.RULE('fullCallParameter', () => {
		this.OR([
			{ ALT: () => this.CONSUME(Lexer.StringLiteral) },
			{ ALT: () => this.CONSUME(Lexer.NumberLiteral) },
			{ ALT: () => this.CONSUME(Lexer.BooleanLiteral) }
		]);
	});

}