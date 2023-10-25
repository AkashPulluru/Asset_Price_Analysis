import Stocks from './stocks';
import View from './view';
import Calculator from './calculator';

document.addEventListener('DOMContentLoaded', () => {
    let stock1, stock2, view1, view2;

    // Event listener for the first stock input
    document.getElementById('stock1').addEventListener('change', async (e) => {
        const ticker = e.target.value;
        stock1 = new Stocks(ticker);
        view1 = new View(stock1, 'stock1-container', 'stock1-news');
        await view1.createData();
        const newsData = await stock1.getNews();
        view1.displayNews(newsData);
    });

    // Event listener for the second stock input
    document.getElementById('stock2').addEventListener('change', async (e) => {
        const ticker = e.target.value;
        stock2 = new Stocks(ticker);
        view2 = new View(stock2, 'stock2-container', 'stock2-news');
        await view2.createData();
        const newsData = await stock2.getNews();
        view2.displayNews(newsData);
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
            
            //Decimal points for correlation output 
            correlationOutput.value = correlation.toFixed(4);
        } else {
            console.log("Failed to calculate the correlation.");
        }
    });

    
    //Event listener for sticky note modal 
    const modal = document.getElementById('sticky-note-modal');
    modal.style.display = "block";
  
    // Close the modal when the close button is clicked
    const closeButton = document.querySelector('.close-btn');
    closeButton.addEventListener('click', () => {
      modal.style.display = "none";
    });
  
    // Close the modal when clicking outside of it
    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
});
