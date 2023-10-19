import Stocks from './stocks';
import Statistics from '../node_modules/statistics.js/statistics.js';



class Calculator {
    constructor(stock1, stock2) {
        this.stock1 = stock1; 
        this.stock2 = stock2; 
    }

//     async calculateCorrelations() {
//         const stock1Prices = await this.stock1.getPrices();
//         const stock2Prices = await this.stock2.getPrices();
    
//         if (!stock1Prices || !Array.isArray(stock1Prices) || !stock2Prices || !Array.isArray(stock2Prices)) {
//             console.error("One or both of the stock prices data is invalid.");
//             return;
//         }
    
//         const minLength = Math.min(stock1Prices.length, stock2Prices.length);
//         const trimmedStock1Prices = stock1Prices.slice(0, minLength);
//         const trimmedStock2Prices = stock2Prices.slice(0, minLength);
    
//         // Create combined data in the format [[stock1Price1, stock2Price1], [stock1Price2, stock2Price2], ...]
//         const combinedData = trimmedStock1Prices.map((price, index) => ({
//             stock1: price,
//             stock2: trimmedStock2Prices[index]
//         }));
//         const columns = [
//             { name: "stock1", scale: "metric" },
//             { name: "stock2", scale: "metric" }
//         ];
    
//         const statsInstance = new Statistics(combinedData, columns);
//         const results = statsInstance.linearRegression("stock1", "stock2");
//         if (results && results.correlationCoefficient !== undefined) {
//             return results.correlationCoefficient;
//         } else {
//             console.error("Couldn't calculate the correlation coefficient.");
//         }
    
    
// }
}

export default Calculator;
