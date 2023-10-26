
## Correlation Calculator

This web-based application allows users to calculate the Pearson correlation coefficient between two stock tickers over time. Alongside the correlation, the app provides visual charts of stock prices over time and recent news articles related to each stock.

You can find the calculator here (https://akashpulluru.github.io/Asset_Price_Analysis/)

### Features:

- **Correlation Calculation:** Calculates the Pearson correlation coefficient for two stocks.
  
- **Stock Price Over Time:** A visual representation of each stock's price over time using D3.
  
- **Stock News:** Displays recent news articles for each stock.

### Usage:

1. Navigate to the Correlation Calculator page.
2. Input two stock tickers in the designated input fields.
3. View the respective stock's price over time and recent news articles.
4. Click the "Calculate Correlation" button to view the Pearson correlation coefficient between the two stocks.

### Technical Details:

- The front-end is written in **HTML** and **CSS**.
  
- The back-end logic is written in **JavaScript**. The primary classes are `Calculator`, `Stocks`, and `View`.
  
- Uses **Axios** for making API requests.
  
- Uses **D3** for visualizing stock prices over time.
  
- API calls are made to `www.alphavantage.co` to fetch the monthly time series of stock prices and recent news articles.

### External Dependencies:

- Axios
- D3

### Author:

- [Akash Pulluru](https://www.linkedin.com/in/akashpulluru)

