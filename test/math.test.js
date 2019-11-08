const {fahrenheitToCelsius, celsiusToFahrenheit} = require('../src/math');

test('it should convert fahrenheit to Celsius', () =>{
    const temp =  fahrenheitToCelsius(32)
    expect(temp).toBe(0)
})

test('it should convert Celsiu to fahrenheit', () =>{
    const temp = celsiusToFahrenheit(22)
    expect(temp).toBe(71.6)
})