import Stocks from './stocks';
import View from './view';
import Calculator from './calculator'

document.addEventListener('DOMContentLoaded', async () => {

    //initializes first stock with ticker and creates a view 
    const stock1 = new Stocks('META');
    const view1 = new View(stock1, 'stock1-container'); 
    await view1.createData();


    //initializes second stock with ticker and creates another view
    const stock2 = new Stocks('MSFT');
    const view2 = new View(stock2, 'stock2-container'); 
    await view2.createData();

    //calculates correlation using calculator class and two inputted stocks  
    const calculator = new Calculator(stock1, stock2);
    const correlation = await calculator.calculateCorrelations();
    
    //outputs the correlation output to the html element 
    if (correlation !== null) {
        console.log(`Correlation between META and MSFT is: ${correlation}`);
        const correlationOutput = document.getElementById('correlation-output');
        // Displaying the correlation with 4 decimal places.
        correlationOutput.value = correlation.toFixed(4); 
    } else {
        console.log("Failed to calculate the correlation.");
    }
});

