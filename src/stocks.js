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
            // let response = await axios.get(this.apiUrl);
            // console.log(response.data);
            // this.storedData = response.data;

            this.storedData = dt
            
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
        console.log(closingPrices)
        return closingPrices;
    }

    async getNews() { 
        let stock = this.ticker
        let newsApiUrl = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${stock}&apikey=SJRHLXJ8LB105D3F`
        try {
            let news = await axios.get(newsApiUrl);
            this.newsData = news.data;
            return this.newsData;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
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


var dt = {
    "Monthly Time Series": {
    "2023-10-20": {
        "1. open": "302.7400",
        "2. high": "330.5400",
        "3. low": "298.5000",
        "4. close": "308.6500",
        "5. volume": "287707709"
    },
    "2023-09-29": {
        "1. open": "299.3700",
        "2. high": "312.8700",
        "3. low": "286.7900",
        "4. close": "300.2100",
        "5. volume": "406801410"
    },
    "2023-08-31": {
        "1. open": "317.5350",
        "2. high": "324.1400",
        "3. low": "274.3800",
        "4. close": "295.8900",
        "5. volume": "424632813"
    },
    "2023-07-31": {
        "1. open": "286.7000",
        "2. high": "326.2000",
        "3. low": "284.8499",
        "4. close": "318.6000",
        "5. volume": "625339455"
    },
    "2023-06-30": {
        "1. open": "265.9000",
        "2. high": "289.7900",
        "3. low": "258.8800",
        "4. close": "286.9800",
        "5. volume": "481179600"
    },
    "2023-05-31": {
        "1. open": "238.6150",
        "2. high": "268.6500",
        "3. low": "229.8500",
        "4. close": "264.7200",
        "5. volume": "487059059"
    },
    "2023-04-28": {
        "1. open": "208.8400",
        "2. high": "241.6850",
        "3. low": "207.1300",
        "4. close": "240.3200",
        "5. volume": "439810216"
    },
    "2023-03-31": {
        "1. open": "174.5900",
        "2. high": "212.1700",
        "3. low": "171.4300",
        "4. close": "211.9400",
        "5. volume": "690450690"
    },
    "2023-02-28": {
        "1. open": "148.0300",
        "2. high": "197.1600",
        "3. low": "147.0600",
        "4. close": "174.9400",
        "5. volume": "772199855"
    },
    "2023-01-31": {
        "1. open": "122.8200",
        "2. high": "153.1900",
        "3. low": "122.2800",
        "4. close": "148.9700",
        "5. volume": "548770812"
    },
    "2022-12-30": {
        "1. open": "119.1980",
        "2. high": "124.6700",
        "3. low": "112.4600",
        "4. close": "120.3400",
        "5. volume": "653019661"
    },
    "2022-11-30": {
        "1. open": "94.3300",
        "2. high": "118.7400",
        "3. low": "88.0900",
        "4. close": "118.1000",
        "5. volume": "1063814422"
    }
}
}
 




