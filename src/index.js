import Stocks from './stocks';
import View from './view';
import Calculator from './calculator';

document.addEventListener('DOMContentLoaded', () => {
    let stock1, stock2, view1, view2;

    // Event listener for the first stock input
    document.getElementById('stock1').addEventListener('change', async (e) => {
        const ticker = e.target.value;
        stock1 = new Stocks(ticker);
        view1 = new View(stock1, 'stock1-container');
        await view1.createData();
    });

    // Event listener for the second stock input
    document.getElementById('stock2').addEventListener('change', async (e) => {
        const ticker = e.target.value;
        stock2 = new Stocks(ticker);
        view2 = new View(stock2, 'stock2-container');
        await view2.createData();
    });

    // Event listener for the calculate correlation button
    document.getElementById('calculate-correlation').addEventListener('click', async () => {
        if (!stock1 || !stock2) {
            console.log("Please enter both stock tickers.");
            return;
        }
        
        const calculator = new Calculator(stock1, stock2);
        const correlation = await calculator.calculateCorrelations();

        if (correlation !== null) {
            console.log(`Correlation between ${stock1.ticker} and ${stock2.ticker} is: ${correlation}`);
            const correlationOutput = document.getElementById('correlation-output');
            correlationOutput.value = correlation.toFixed(4);
        } else {
            console.log("Failed to calculate the correlation.");
        }
    });
});
