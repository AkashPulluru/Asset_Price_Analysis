import axios from 'axios';

class Stocks {

    //currently all API call values besides ticker are hardcoded 
    constructor(ticker) {
        this.ticker = ticker;
        this.apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${ticker}&outputsize=compact&apikey=SJRHLXJ8LB105D3F`;
        this.storedData = null;
    }

    //grabs the data from the api and stores it in storedData 
    async getData() {
        try {
            let response = await axios.get(this.apiUrl);
            this.storedData = response.data;
            return this.storedData;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    //used primarily for correlation calculation, grabs the price data
    //time series of monthly is currently hardcoded 
    async getPrices() {
        this.storedData = await this.getData();
        if (!this.storedData) return;
        
        let closingPrices = [];
        for (let date in this.storedData["Monthly Time Series"]) {
            closingPrices.push(parseFloat(this.storedData["Monthly Time Series"][date]['4. close']));
        }
        return closingPrices;
    }

    // async getreturn() {
    //     this.storedData = await this.getData();
    //     if (!this.storedData) return;

    //     let period = storedData.length - 1;
        
    //     let lastPrice = this.storedData["Monthly Time Series"][0][date]['4. close']
    //     let firstPrice = this.storedData["Monthly Time Series"][period][date]['4. close']

    //     let return = ((lastPrice / firstPrice) ** (1/period)) - 1 
    // }
    }
export default Stocks;


