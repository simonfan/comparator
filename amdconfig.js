require.config({
	urlArgs: 'bust=0.14333828468807042',
	baseUrl: '/',
	paths: {
		requirejs: 'bower_components/requirejs/require',
		text: 'bower_components/requirejs-text/text',
		mocha: 'node_modules/mocha/mocha',
		should: 'node_modules/should/should',
		comparator: 'src/comparator',
		jquery: 'bower_components/jquery/jquery',
		lodash: 'bower_components/lodash/dist/lodash.compat',
		underscore: 'bower_components/underscore/underscore',
		'requirejs-text': 'bower_components/requirejs-text/text',
		backbone: 'bower_components/backbone/backbone'
	},
	shim: {
		backbone: {
			exports: 'Backbone',
			deps: [
				'jquery',
				'underscore'
			]
		},
		underscore: {
			exports: '_'
		},
		mocha: {
			exports: 'mocha'
		},
		should: {
			exports: 'should'
		}
	}
});
