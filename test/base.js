const comparator = require('../');
const should = require('should');

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
				orange = fruits[0],
				banana = fruits[1],
				apple  = fruits[2];

		priceComparator(orange, banana).should.eql(-1);
		priceComparator(banana, orange).should.eql(1);

		priceComparator(apple, banana).should.eql(0);

		priceComparator(apple, orange).should.eql(1);
	});

	it('Multiple comparison, single direction', function () {

		var fruits = this.fruits,
				priceComparator = comparator('price'),
				priceThenNameComparator = comparator(['price','name']),
				orange = fruits[0],
				banana = fruits[1],
				apple  = fruits[2];

		priceThenNameComparator(orange, apple).should.eql(-1);
		priceThenNameComparator(apple, orange).should.eql(1);

		priceComparator(apple, banana).should.eql(0);
		priceThenNameComparator(apple, banana).should.eql(-1);
		priceThenNameComparator(banana, apple).should.eql(1);
	});

	// it('Multiple comparison using backbone models', function () {

	// 	var fruits = this.fruits,
	// 		bbFruits = new Backbone.Collection(_.clone(fruits));

	// 	bbFruits.pluck('name').should.eql(_.pluck(fruits, 'name'));

	// 	// set a comparator on bbFruits
	// 	bbFruits.comparator = comparator(['price','name'], {
	// 		price: -1,
	// 		name: -1,
	// 	}, {
	// 		root: 'attributes'
	// 	});

	// 	bbFruits.sort();

	// 	bbFruits.pluck('name').should.eql(['Banana','Apple','Orange']);
	// });

	// it('direction simple', function () {
	// 	var fruits = this.fruits,
	// 		higherQuantities = comparator('quantity', -1);

	// 	// sort fruits
	// 	_.pluck(fruits.sort(higherQuantities),'quantity').should.eql([30, 25, 20])
	// })

});
