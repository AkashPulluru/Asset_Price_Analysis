import { select, scaleLinear, scaleUtc, extent, max, axisBottom, axisLeft, line as drawLine, create } from 'd3';


class View {
    constructor(stock, containerId) {
        this.stock = stock;
        this.storedData = null;
        this.containerId = containerId;
    }

    async createData() {
        this.storedData = await this.stock.getData();
        this.presentData(this.storedData["Monthly Time Series"]);
    }

    presentData(storedData) {
        const stockData = [];
        for (let date in storedData) {
            stockData.push({
                date: new Date(date),

                //note to self: put the + in here to ensure that the value returns as a number 
                price: +storedData[date]['4. close']
            });
        }

        //This is where we're grabbing the d3 element from the html doc  
        const container = select(`#${this.containerId}`);

        //D3 graph elements are set here - it's currently implemented so both graphs are the same 
        const width = 500;
        const height = 500;
        const marginTop = 20;
        const marginRight = 20;
        const marginBottom = 30;
        const marginLeft = 50;

        //REVISIT - will not accept custom timescales, so bounding it by extent for now 

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
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-width", 1.5)
            .attr("d", line);

        container.append(() => svg.node());
    }
}

export default View;
