function addTrade() {
    const stockName = document.getElementById('stockName').value;
    const amountInvested = parseFloat(document.getElementById('amountInvested').value);
    const buyPrice = parseFloat(document.getElementById('buyPrice').value);
    const sellPrice = parseFloat(document.getElementById('sellPrice').value);
    const tradeType = document.getElementById('tradeType').value;

    // Number of shares purchased
    const numShares = Math.floor(amountInvested / buyPrice);

    // Total sale value
    const saleValue = sellPrice * numShares;
    const actualAmountInvested = buyPrice * numShares;
    // Gross Profit
    const grossProfit = saleValue - actualAmountInvested;

    // Charges Calculations
    const brokerageFee = (saleValue * 0.55) / 100;
    const sttFee = (saleValue * 0.1) / 100;
    const exchangeCharges = (saleValue * 0.0034) / 100;
    const sebiFee = (saleValue * 0.0001) / 100;
    const stampDuty = (buyPrice * numShares * 0.015) / 100;
    const gstFee = (brokerageFee + exchangeCharges) * 0.18;

    const totalCharges = brokerageFee + sttFee + exchangeCharges + sebiFee + stampDuty + gstFee;

    // Final profit before and after tax
    let netProfitBeforeTax = grossProfit - totalCharges;

    // Short-term calculations (Only if 'short' is selected)
    let shortTermIncomeTax = 0;
    let shortTermFinalProfit = netProfitBeforeTax;
    if (tradeType === 'short') {
        shortTermIncomeTax = netProfitBeforeTax * 0.15;
        shortTermFinalProfit = netProfitBeforeTax - shortTermIncomeTax;
    }

    // Long-term calculations (Always check for ₹1,00,000 threshold)
    let longTermIncomeTax = 0;
    let longTermFinalProfit = netProfitBeforeTax;
    if (netProfitBeforeTax > 100000) {
        longTermIncomeTax = (netProfitBeforeTax - 100000) * 0.1;
        longTermFinalProfit = netProfitBeforeTax - longTermIncomeTax;
    }

    // Update tables with calculated values
    document.getElementById('stockNameDetails').innerText = stockName;
    document.getElementById('investmentAmount').innerText = actualAmountInvested.toFixed(2);
    document.getElementById('buyPriceDetails').innerText = buyPrice.toFixed(2);
    document.getElementById('numShares').innerText = numShares;
    document.getElementById('sellPriceDetails').innerText = sellPrice.toFixed(2);
    document.getElementById('saleValue').innerText = saleValue.toFixed(2);
    document.getElementById('grossProfit').innerText = grossProfit.toFixed(2);

    document.getElementById('brokerageFee').innerText = brokerageFee.toFixed(2);
    document.getElementById('sttFee').innerText = sttFee.toFixed(2);
    document.getElementById('exchangeCharges').innerText = exchangeCharges.toFixed(2);
    document.getElementById('sebiFee').innerText = sebiFee.toFixed(2);
    document.getElementById('stampDuty').innerText = stampDuty.toFixed(2);
    document.getElementById('gstFee').innerText = gstFee.toFixed(2);
    document.getElementById('totalCharges').innerText = totalCharges.toFixed(2);

    // Update short-term profit details
    document.getElementById('netProfitBeforeTax').innerText = netProfitBeforeTax.toFixed(2);
    document.getElementById('incomeTax').innerText = shortTermIncomeTax.toFixed(2);
    document.getElementById('finalProfit').innerText = shortTermFinalProfit.toFixed(2);

    // Update long-term profit details (Independent of selection)
    document.getElementById('longTermNetProfitBeforeTax').innerText = netProfitBeforeTax.toFixed(2);
    document.getElementById('longTermIncomeTax').innerText = longTermIncomeTax.toFixed(2);
    document.getElementById('longTermFinalProfit').innerText = longTermFinalProfit.toFixed(2);

}

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF('p', 'mm', 'a4');

    const element = document.getElementById('report-container'); // Capture only the report section

    html2canvas(element, { scale: 2 }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('investment_report.pdf');
    });
}

