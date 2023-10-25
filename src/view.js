import { select, scaleLinear, scaleUtc, extent, max, axisBottom, axisLeft, line as drawLine, create } from 'd3';


class View {

    //accepts a stock ticker and the id of the html element where it should be rendered
    constructor(stock, containerId, newsId) {
        this.stock = stock;
        this.newsId = newsId;
        this.storedData = null;
        this.containerId = containerId;
    }

    //grabs the stock data and calls presentData. Currently hardcoded to monthly time series
    async createData() {
        this.storedData = await this.stock.getData();
        this.presentData(this.storedData["Monthly Time Series"]);
    }

    //sets svg graph elements and puts the graph in the html container
    presentData(storedData) {
        const stockData = [];
        for (let date in storedData) {
            stockData.push({
                date: new Date(date),
                price: +storedData[date]['4. close']
            });
        }
    
        const container = select(`#${this.containerId}`);

        container.selectAll("svg").remove(); 
    
        const width = 500;
        const height = 500;
        const marginTop = 20;
        const marginRight = 20;
        const marginBottom = 30;
        const marginLeft = 50;
    
        const x = scaleUtc()
            .domain(extent(stockData, d => d.date))
            .range([marginLeft, width - marginRight]);
    
        const y = scaleLinear()
            .domain([0, max(stockData, d => d.price)])
            .range([height - marginBottom, marginTop]);
    
        const svg = create("svg")
            .attr("width", width)
            .attr("height", height);
    
        svg.append("g")
            .attr("transform", `translate(0, ${height - marginBottom})`)
            .call(axisBottom(x));
    
        svg.append("g")
            .attr("transform", `translate(${marginLeft},0)`)
            .call(axisLeft(y));
    
            const line = drawLine()
            .x(d => x(d.date))
            .y(d => y(d.price));
        
        const path = svg.append("path")
            .datum(stockData)
            .attr("fill", "gray")
            .attr("stroke", "blue")
            .attr("stroke-width", 1.5)
            .attr("fill-opacity", 0) 
            .attr("d", line);

        const totalLength = path.node().getTotalLength();
        path
            .attr("stroke-dasharray", totalLength + " " + totalLength)
            .attr("stroke-dashoffset", totalLength)
            .transition()
            .duration(3000) 
            .attr("stroke-dashoffset", 0)
            .on("end", () => { 
                path.attr("fill-opacity", 0.8); 
                this.drawCircles(svg, stockData, x, y); 
            });

        container.append(() => svg.node()); 

    }

    showTooltip(event, d) {
        const tooltip = document.getElementById('tooltip');
        tooltip.innerHTML = `Date: ${d.date.toDateString()}<br>Price: ${d.price}`;
        tooltip.style.left = (event.pageX + 15) + 'px';
        tooltip.style.top = (event.pageY - 28) + 'px';
        tooltip.style.display = 'block';
    }
    
    hideTooltip(event, d) {
        const tooltip = document.getElementById('tooltip');
        tooltip.style.display = 'none';
    }

    drawCircles(svg, stockData, x, y) {
        svg.selectAll('circle')
            .data(stockData)
            .enter().append('circle')
            .attr('cx', d => x(d.date))
            .attr('cy', d => y(d.price))
            .attr('r', 1.5)
            .attr('fill', 'gray')
            .on('mouseover', (event, d) => this.showTooltip(event, d))
            .on('mouseout', (event, d) => this.hideTooltip(event, d));
    }

    //Displays news data and sets the number of news articles to pull 
    displayNews(newsData) {
        let articleNumber = 3;
    
        // Update the target element for the news
        const container = select(`#${this.newsId}`);
        
        // Removes any previous data.
        container.selectAll('*').remove();  
        
        newsData.feed.slice(0, articleNumber).forEach(newsItem => {
            const newsTile = container.append('div').attr('class', 'news-tile');
            newsTile.append('h3').text(newsItem.title);
            newsTile.append('a').attr('href', newsItem.url).text('Read More');
            newsTile.append('p').text(newsItem.summary);
        });
    }
    
        
}

export default View;
