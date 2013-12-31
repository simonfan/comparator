(function(name, factory) {

	var mod = typeof define !== 'function' ?
		// node
		'.././src/comparator' :
		// browser
		'comparator',
		// dependencies for the test
		deps = [mod, 'should', 'lodash', 'backbone'];

	if (typeof define !== 'function') {
		// node
		factory.apply(null, deps.map(require));
	} else {
		// browser
		define(deps, factory);
	}

})('test', function(comparator, should, _, Backbone) {
	'use strict';

	describe('comparatorFunc = comparator(props, options)', function () {

		beforeEach(function () {
			var fruits = this.fruits = [];

			fruits.push({
				name: 'Orange',
				price: 3,
				quantity: 20,
			});

			fruits.push({
				name: 'Banana',
				price: 4,
				quantity: 25,
			});

			fruits.push({
				name: 'Apple',
				price: 4,
				quantity: 30,
			});
		});

		it('Single comparison', function() {
			var fruits = this.fruits,
				priceComparator = comparator('price', { price: 1 }),
				orange = _.findWhere(fruits, { name: 'Orange' }),
				banana = _.findWhere(fruits, { name: 'Banana' }),
				apple = _.findWhere(fruits, { name: 'Apple' });

			priceComparator(orange, banana).should.eql(-1);
			priceComparator(banana, orange).should.eql(1);

			priceComparator(apple, banana).should.eql(0);

			priceComparator(apple, orange).should.eql(1);
		});

		it('Multiple comparison, single direction', function () {

			var fruits = this.fruits,
				priceComparator = comparator('price'),
				priceThenNameComparator = comparator(['price','name']),
				orange = _.findWhere(fruits, { name: 'Orange' }),
				banana = _.findWhere(fruits, { name: 'Banana' }),
				apple = _.findWhere(fruits, { name: 'Apple' });

			priceThenNameComparator(orange, apple).should.eql(-1);
			priceThenNameComparator(apple, orange).should.eql(1);

			priceComparator(apple, banana).should.eql(0);
			priceThenNameComparator(apple, banana).should.eql(-1);
			priceThenNameComparator(banana, apple).should.eql(1);
		});

		it('Multiple comparison using backbone models', function () {

			var fruits = this.fruits,
				bbFruits = new Backbone.Collection(_.clone(fruits));

			bbFruits.pluck('name').should.eql(_.pluck(fruits, 'name'));

			// set a comparator on bbFruits
			bbFruits.comparator = comparator(['price','name'], {
				price: -1,
				name: -1,
			}, {
				root: 'attributes'
			});

			bbFruits.sort();

			bbFruits.pluck('name').should.eql(['Banana','Apple','Orange']);
		});

		it('direction simple', function () {
			var fruits = this.fruits,
				higherQuantities = comparator('quantity', -1);

			// sort fruits
			_.pluck(fruits.sort(higherQuantities),'quantity').should.eql([30, 25, 20])
		})

	});
});



/*

define(['underscore.comparator','backbone'], function(undef, Backbone) {

	return function()

		test('Multiple comparison, single direction', function() {
		});


		test('Multiple comparison using backbone models', function() {
		});



		test('direction simple setting', function() {

		});

	}
});
*/
