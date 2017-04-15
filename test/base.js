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

	it('should compare items ascending by price', function() {
		var fruits = this.fruits,
				priceComparator = comparator('price'),
				orange = fruits[0],
				banana = fruits[1],
				apple  = fruits[2];

		priceComparator(orange, banana).should.eql(-1);
		priceComparator(banana, orange).should.eql(1);

		priceComparator(apple, banana).should.eql(0);

		priceComparator(apple, orange).should.eql(1);
	});

	it('should compare items descending by price', function() {
		var fruits = this.fruits,
				priceComparator = comparator('-price'),
				orange = fruits[0],
				banana = fruits[1],
				apple  = fruits[2];

		priceComparator(orange, banana).should.eql(1);
		priceComparator(banana, orange).should.eql(-1);

		priceComparator(apple, banana).should.eql(0);

		priceComparator(apple, orange).should.eql(-1);
	});

	it('should allow for defining a compare property in object format', function() {
		var fruits = this.fruits,
				priceComparator = comparator({
					property: 'price',
					direction: -1
				}),
				orange = fruits[0],
				banana = fruits[1],
				apple  = fruits[2];

		priceComparator(orange, banana).should.eql(1);
		priceComparator(banana, orange).should.eql(-1);

		priceComparator(apple, banana).should.eql(0);

		priceComparator(apple, orange).should.eql(-1);
	});

	it('use multiple properties for running comparisons multiple comparisons', function () {

		var fruits = this.fruits,
				priceComparator = comparator('price'),
				priceThenNameComparator = comparator(['price', 'name']),
				orange = fruits[0],
				banana = fruits[1],
				apple  = fruits[2];

		priceThenNameComparator(orange, apple).should.eql(-1);
		priceThenNameComparator(apple, orange).should.eql(1);

		priceComparator(apple, banana).should.eql(0);
		priceThenNameComparator(apple, banana).should.eql(-1);
		priceThenNameComparator(banana, apple).should.eql(1);
	});

});
