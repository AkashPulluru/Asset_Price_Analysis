import Stocks from './stocks';
import View from './view';
import Calculator from './calculator'

document.addEventListener('DOMContentLoaded', async () => {
    const stock1 = new Stocks('META');
    const view1 = new View(stock1, 'stock1-container'); 
    await view1.createData();

    const stock2 = new Stocks('MSFT');
    const view2 = new View(stock2, 'stock2-container'); 
    await view2.createData();

    const calculator = new Calculator(stock1, stock2);
    const correlation = await calculator.calculateCorrelations();
    
    if (correlation !== null) {
        console.log(`Correlation between META and MSFT is: ${correlation}`);
        const correlationOutput = document.getElementById('correlation-output');
        correlationOutput.value = correlation.toFixed(4); // Displaying the correlation with 4 decimal places.
    } else {
        console.log("Failed to calculate the correlation.");
    }
});

