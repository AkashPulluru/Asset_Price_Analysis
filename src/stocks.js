import axios from 'axios';

class Stocks {

    //Currently all API call values besides ticker are hardcoded 
    constructor(ticker) {
        this.ticker = ticker;
        this.apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${ticker}&outputsize=compact&apikey=YF5KPRZNK16IVMYW`;
        this.storedData = null;
    }

    //Grabs the data from the api and stores it in storedData 
    async getData() {
        try {
            let response = await axios.get(this.apiUrl);
            this.storedData = response.data;

            
            return this.storedData;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    //Used primarily for correlation calculation - retrieves price data from data object. Monthly is hardcoded. 
    async getPrices() {
        this.storedData = await this.getData();
        if (!this.storedData) return;
        
        let closingPrices = [];
        
        for (let date in this.storedData["Monthly Time Series"]) {
            closingPrices.push(parseFloat(this.storedData["Monthly Time Series"][date]['4. close']));
        }
        return closingPrices;
    }

    //Retrieves news data from API and populates it for each stock
    async getNews() { 
        let stock = this.ticker
        let newsApiUrl = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${stock}&limit=2&apikey=YF5KPRZNK16IVMYW`
        try {
            let news = await axios.get(newsApiUrl);
            this.newsData = news.data;
            return this.newsData;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    }
export default Stocks;

