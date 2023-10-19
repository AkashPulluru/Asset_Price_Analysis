import Stocks from './stocks';
import View from './view';

document.addEventListener('DOMContentLoaded', () => {
    const stock = new Stocks('META');
    const view = new View(stock, 'stock1-container'); 
    view.createData();

    const stock2 = new Stocks('IBM');
    const view2 = new View(stock2, 'stock2-container'); 
    view2.createData();
});
