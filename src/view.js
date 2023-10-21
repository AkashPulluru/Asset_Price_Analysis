import { select, scaleLinear, scaleUtc, extent, max, axisBottom, axisLeft, line as drawLine, create } from 'd3';


class View {
    //accepts a stock ticker and the id of the html element where it should be rendered
    constructor(stock, containerId) {
        this.stock = stock;
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

                //note: the + is in here to ensure that the value returns as a number 
                price: +storedData[date]['4. close']
            });
        }

        //this is where we're grabbing the d3 element from the html document  
        const container = select(`#${this.containerId}`);

        //D3 graph elements are set here - it's currently implemented so both graphs are the same 
        const width = 500;
        const height = 500;
        const marginTop = 20;
        const marginRight = 20;
        const marginBottom = 30;
        const marginLeft = 50;

        //D3 would not accept custom timescales, so it is bounded by extent for now 

        //all the variables called below are initialized right above 
        const x = scaleUtc()
            .domain(extent(stockData, d => d.date))
            .range([marginLeft, width - marginRight]);

        const y = scaleLinear()
            .domain([0, max(stockData, d => d.price)])
            .range([height - marginBottom, marginTop]);

        const svg = create("svg")
            .attr("width", width)
            .attr("height", height);

        //g is like "div" for html - container holding elements 
        //transform element lets you do the translation transformations
        //translate is a simple linear / scalar transformation
        svg.append("g")
            .attr("transform", `translate(0, ${height - marginBottom})`)
            .call(axisBottom(x));

        svg.append("g")
            .attr("transform", `translate(${marginLeft},0)`)
            .call(axisLeft(y));

            const line = drawLine()
            .x(d => x(d.date))
            .y(d => y(d.price));

        svg.append("path")
        //iterates through individual stock data
            .datum(stockData)
            .attr("fill", "gray")
            .attr("stroke", "blue")
            .attr("stroke-width", 0.5)
            .attr("d", line)
            .attr("fill-opacity", 0.8);

        svg.selectAll('circle')
            .data(stockData)
            .enter().append('circle')
            .attr('cx', d => x(d.date))
            .attr('cy', d => y(d.price))
            .attr('r', 3) // circle radius
            .attr('fill', 'gray')
            .on('mouseover', (event, d) => this.showTooltip(event, d))
            .on('mouseout', (event, d) => this.hideTooltip(event, d));
        

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
    
}

export default View;
