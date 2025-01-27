const cryptoData = [
    {
        id: 1,
        name: 'Bitcoin',
        symbol: 'BTC',
        price: '375.42 SOL',
        change: '+0.78%',
        chartData: [50, 55, 45, 52, 48, 54, 56],
        trend: 'up'
    },
    {
        id: 2,
        name: 'Ethereum',
        symbol: 'ETH',
        price: '25.83 SOL',
        change: '+0.38%',
        chartData: [40, 45, 42, 47, 43, 46, 48],
        trend: 'up'
    },
    {
        id: 3,
        name: 'Monero',
        symbol: 'XMR',
        price: '7.45 SOL',
        change: '-0.42%',
        chartData: [45, 42, 40, 38, 41, 39, 37],
        trend: 'down'
    },
    {
        id: 4,
        name: 'Litecoin',
        symbol: 'LTC',
        price: '2.68 SOL',
        change: '+1.64%',
        chartData: [30, 32, 35, 34, 36, 38, 40],
        trend: 'up'
    },
    {
        id: 5,
        name: 'Komodo',
        symbol: 'KMD',
        price: '0.217 SOL',
        change: '-0.38%',
        chartData: [25, 23, 24, 22, 24, 23, 22],
        trend: 'down'
    }
];

function drawChart(canvas, data, trend) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const padding = 2;
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    const range = maxValue - minValue;
    
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.strokeStyle = trend === 'up' ? '#36B37E' : '#FF5630';
    ctx.lineWidth = 1.5;

    data.forEach((value, index) => {
        const x = (index / (data.length - 1)) * width;
        const y = height - (((value - minValue) / range) * (height - padding * 2) + padding);
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });

    ctx.stroke();
}

function populateTable() {
    const tableBody = document.getElementById('crypto-table-body');
    
    cryptoData.forEach(crypto => {
        const row = document.createElement('tr');
        
        const canvas = document.createElement('canvas');
        canvas.width = 100;
        canvas.height = 30;

        row.innerHTML = `
            <td>${crypto.id}</td>
            <td class="name-cell">
                <img src="https://cryptologos.cc/logos/${crypto.name.toLowerCase()}-${crypto.symbol.toLowerCase()}-logo.png" 
                     class="crypto-icon" 
                     alt="${crypto.name}">
                ${crypto.name} - ${crypto.symbol}
            </td>
            <td>${crypto.price}</td>
            <td class="${crypto.change.includes('+') ? 'positive-change' : 'negative-change'}">${crypto.change}</td>
            <td class="chart-cell"></td>
            <td><button class="buy-button">BUY</button></td>
        `;

        row.querySelector('.chart-cell').appendChild(canvas);
        drawChart(canvas, crypto.chartData, crypto.trend);
        
        tableBody.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', populateTable);
