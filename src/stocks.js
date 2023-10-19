import axios from 'axios';

class Stocks {
    constructor(ticker) {
        this.ticker = ticker;
        this.apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${ticker}&apikey=SJRHLXJ8LB105D3F`;
        this.storedData = null;
    }

    async getData() {
        try {
            let response = await axios.get(this.apiUrl);
            this.storedData = response.data;
            return this.storedData;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async getPrices() {
        this.storedData = await this.getData();
        if (!this.storedData) return;
        
        let closingPrices = [];
        for (let date in this.storedData["Monthly Time Series"]) {
            closingPrices.push(parseFloat(this.storedData["Monthly Time Series"][date]['4. close']));
        }
        return closingPrices;
    }
    }
export default Stocks;


