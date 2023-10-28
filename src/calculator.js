import axios from 'axios';

class Calculator {
    constructor(stock1, stock2) {
        this.stock1 = stock1;
        this.stock2 = stock2;
    }

    async calculateCorrelations() {
        //Uses get prices method to get prices for each individual ticker
        const stock1Prices = await this.stock1.getPrices();
        const stock2Prices = await this.stock2.getPrices();

        //Checks that stock data is formatted appropriately 
        if (!stock1Prices || !Array.isArray(stock1Prices) || !stock2Prices || !Array.isArray(stock2Prices)) {
            console.error("One or both of the stock prices data is invalid.");
            return null;
        }

        //Trims the longer array to be an equivelant time series to the shorter array
        const minLength = Math.min(stock1Prices.length, stock2Prices.length);
        const trimmedStock1Prices = stock1Prices.slice(0, minLength);
        const trimmedStock2Prices = stock2Prices.slice(0, minLength);

        //Length of shorter array
        const n = trimmedStock1Prices.length;

        //Gets cumulative stock prices for each ticker using an accumulator
        const sumX = trimmedStock1Prices.reduce((acc, value) => acc + value, 0);
        const sumY = trimmedStock2Prices.reduce((acc, value) => acc + value, 0);

        //Gets cumulative stock prices for both tickers added together using an accumulator
        const sumXY = trimmedStock1Prices.reduce((acc, value, index) => acc + value * trimmedStock2Prices[index], 0);

        //Gets sum of both values
        const sumX2 = trimmedStock1Prices.reduce((acc, value) => acc + value * value, 0);
        const sumY2 = trimmedStock2Prices.reduce((acc, value) => acc + value * value, 0);

        //Creates numerator of pearson correlation 
        const numerator = n * sumXY - sumX * sumY;

        //Creates denominator of pearson correlation
        const denominator = Math.sqrt((n * sumX2 - sumX ** 2) * (n * sumY2 - sumY ** 2));

        const correlation = numerator / denominator;
        
        if (!isNaN(correlation)) {
            return correlation;
        } else {
            console.error("Couldn't calculate the correlation coefficient.");
            return null;
        }
    }

}


export default Calculator;



