import Stocks from './stocks';
import View from './view';

document.addEventListener('DOMContentLoaded', () => {
    const stock = new Stocks('META');
    const view = new View(stock);
    view.createData();

    const stock2 = new Stocks('GOOG');
    const view2 = new View(stock2);
    view2.createData();
});