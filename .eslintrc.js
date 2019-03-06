module.exports = {
	'env': {'node': true},
	'extends': ['google'],
	'parserOptions': {
		'ecmaVersion': 2019,
		'sourceType': 'module',
		'parser': 'babel-eslint',
	},
	'rules': {
		'linebreak-style': ['error','windows'],
		'no-tabs': 0,
	}
};
