import Stocks from './stocks';
import View from './view';
import Calculator from './calculator'

document.addEventListener('DOMContentLoaded', async () => {
    const stock1 = new Stocks('META');
    const view1 = new View(stock1, 'stock1-container'); 
    await view1.createData();

    const stock2 = new Stocks('IBM');
    const view2 = new View(stock2, 'stock2-container'); 
    await view2.createData();

    // const calculator = new Calculator(stock1, stock2);
    // const correlation = await calculator.calculateCorrelations();
    // console.log(`Correlation between META and IBM is: ${correlation}`);
});
