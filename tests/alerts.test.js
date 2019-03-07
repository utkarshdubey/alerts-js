const travisCITest = require('../dist/alerts');


test('Checks whether the class works', () => {
    expect(travisCITest.travisCITest()).toBe(true);
});
