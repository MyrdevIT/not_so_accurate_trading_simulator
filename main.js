// ADD Responsive transtactions and qty
day = 1;
function roundToTwoDecimals(num) {
    return Math.round(num * 100) / 100;
}



function getLargestInt(arr) {
    // Filter the array to only integers, then find the maximum value
    return Math.max(...arr);
}
let money = 1000;
max_transactionqtyMTX = 1000;
valuemtx = Number(25);
prevval = 25;
firstval = valuemtx;
var softcap = 100;
var hardcap = 500;

let amountmtx1 = parseInt(0);

let usdvalmtx1 = Number(amountmtx1*valuemtx);

let amountmtx2 = parseInt(0);
let usdvalmtx2 = parseInt(amountmtx2*valuemtx);

let amountmtx3 = parseInt(0);
let usdvalmtx3 = parseInt(amountmtx3*valuemtx);

let destined_value = 0;

function calculatecost_mtx(amount) {
    let cost = amount * valuemtx;
    return roundToTwoDecimals(cost);

}
function calculateinfluence_mtx(amount) {
    let num = (amount - amount%200)/200;
    return num;

}

function calculate_pricebuy_mtx(amount) {
    let price = 0;
    let num = Math.floor(amount / 200); // Number of full 200-MTX blocks
    let remaining = amount % 200;      // Remaining MTX after full blocks
    let baseValue = valuemtx;          // Initial value of MTX

    for (let i = 0; i < num; i++) {
        price += 200 * baseValue;
        baseValue += baseValue * 0.1; // Increase baseValue by 10% for the next block
    }

    price += remaining * baseValue; // Add the remaining MTX at the final adjusted price
    return roundToTwoDecimals(price);
}

function calculate_price_sell_mtx(amount) {
    let price = 0;
    let num = Math.floor(amount / 200); // Number of full 200-MTX blocks
    let remaining = amount % 200;      // Remaining MTX after full blocks
    let baseValue = valuemtx;          // Initial value of MTX

    for (let i = 0; i < num; i++) {
        baseValue -= baseValue * 0.1;  // Decrease baseValue by 10% for each block
        price += 200 * baseValue;
    }

    baseValue -= baseValue * 0.1;      // Decrease baseValue for the remaining MTX
    price += remaining * baseValue;   // Add the remaining MTX at the final adjusted price
    return roundToTwoDecimals(price);
}


function updatte() {
    valuemtx = roundToTwoDecimals(valuemtx);
    document.getElementById('valuemtx').textContent = valuemtx;
    
    usdvalmtx1 = Number(amountmtx1*valuemtx);
    usdvalmtx1 = roundToTwoDecimals(usdvalmtx1)
    
    
    let usdvalmtx2 = parseInt(amountmtx2*valuemtx);
    
    
    let usdvalmtx3 = parseInt(amountmtx3*valuemtx);
    money = roundToTwoDecimals(money);
    document.getElementById('money_d').textContent = money;
    document.getElementById('amountmtx1').textContent = amountmtx1;

    document.getElementById('usdvalmtx1').textContent = usdvalmtx1;

}


updatte();

const xValues = [1];
const yValues = [valuemtx];

// Create the chart instance and save it to a variable
const myChart = new Chart("myChart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{
      fill: false,
      lineTension: 0,
      backgroundColor: "rgba(0,0,255,1.0)",
      borderColor: "rgba(0,0,255,1.0)",
      data: yValues
    }]
  },
  options: {
    legend: { display: false },
    scales: {
      yAxes: [{ ticks: { min: 0, max: 15 } }]
    }
  }
});


current_cycle = null;
current_cycle_duration = 0;
cycle_boom = {
  
    values: [0.3, 0.4, 0.5,],
    duration: 1
  
}
cycle_rise2 = {
    
    values: [0.05, 0.04, 0.06, 0.07, 0.08, 0.09, 0.15, 0.2, 0.1, -0.1, -0.05, -0.04, -0.07],
    duration: 4
}
cycle_rise1 = {


    values: [0.01, 0.02, 0.03, 0.04, 0.005, 0.01, 0.015, 0.025,-0.05, -0.04, -0.01 ],
    duration: 4
}
cycle_stable = {
    values: [0.01, 0.015, 0.017, 0.02, 0.025, 0.03, -0.01, -0.015, -0.017, -0.02, -0.025, -0.03, 0 ],
    duration: 10
}

cycle_fall1 = {
    values: [-0.01, -0.02, -0.03, -0.04, -0.005, -0.01, -0.015, -0.025, 0.05, 0.04, 0.01],
    duration: 5
}

cycle_fall2 = {
    values: [-0.05, -0.04, -0.06, -0.07, -0.08, -0.09, -0.15, -0.2, -0.1, 0.1, 0.05, 0.04, 0.07],
    duration: 3
}

cycle_crash = {
    values: [-0.3, -0.4, -0.5,],
    duration: 1
}

function pick_cycle() {
    let ran = Math.floor(Math.random() * 100) + 1;

    if (ran >= 1 && ran <= 2) {
        current_cycle = cycle_boom;
    } else if (ran >= 3 && ran <= 16) {
        current_cycle = cycle_rise2;
    } else if (ran >= 17 && ran <= 36) {
        current_cycle = cycle_rise1
    } else if (ran >= 37 && ran <= 65) {
        current_cycle = cycle_stable
    } else if (ran >= 66 && ran <= 85) {
        current_cycle = cycle_fall1
    }  else if (ran >= 86 && ran <= 99) {
        current_cycle = cycle_fall2
    } else if (ran >= 100 && ran <= 100) {
        current_cycle = cycle_crash
    } 


}

function calculate_value1() {
    if (current_cycle === null) {
        pick_cycle();
    } else {
        let ran = Math.floor(Math.random() * current_cycle.values.length);
        destined_value = current_cycle.values[ran]
        current_cycle_duration += 1
        if (current_cycle_duration == current_cycle.duration) {
            current_cycle = null;
            current_cycle_duration = 0;
        }

    }
}




// Function to add a new data point and update the chart
function push() {
    function cval1() {
        calculate_value1()
        valuemtx += destined_value*valuemtx;
    }
    // Call cval1 to update valuemtx
    cval1();

    // Correctly increment xValues
    xValues.push(xValues[xValues.length - 1] + 1);
    yValues.push(valuemtx);
    // if (xValues.length > 100) {
    //     xValues.shift();
    // }
    // if (yValues.length > 100) {
    //     yValues.shift();
    // }
    // myChart.options.scales.yAxes[0].ticks.max = ((valuemtx - valuemtx%10) / 10) + 10;
    
    myChart.options.scales.yAxes[0].ticks.max = getLargestInt(yValues)
    updatte();
    if (valuemtx == prevval) {
        document.getElementById('valuemtx').style.color = "black";
        document.getElementById('usd').style.color = "black";
        myChart.data.datasets[0].backgroundColor = "rgba(0,0,0,1.0)";
        myChart.data.datasets[0].borderColor = 'rgba(0,0,0,1.0)';
    } else if (valuemtx > prevval) {
        document.getElementById('valuemtx').style.color = "green";
        document.getElementById('usd').style.color = "green";
        myChart.data.datasets[0].backgroundColor = 'rgba(0, 128, 0, 1.0)';
        myChart.data.datasets[0].borderColor = 'rgba(0, 128, 0, 1.0)';
    } else if (valuemtx < prevval) {
        document.getElementById('valuemtx').style.color = "red";
        document.getElementById('usd').style.color = "red";
        myChart.data.datasets[0].backgroundColor = 'rgba(255, 0, 0, 1.0)';
        myChart.data.datasets[0].borderColor = 'rgba(255, 0, 0, 1.0)';

    }
    

    myChart.update();
    prevval = valuemtx;
}




function lbuy(qty) {
    currentValue = valuemtx;
    for (var i = 0; i < qty; i++) {
        currentValue += 0.1*currentValue;

    }
    valuemtx = currentValue; //
    valuemtx = valuemtx.toFixed(2)
    valuemtx = Number(valuemtx)

    // Correctly increment xValues
    xValues.push(xValues[xValues.length - 1] + 1);
    yValues.push(valuemtx);
    // myChart.options.scales.yAxes[0].ticks.max = ((valuemtx - valuemtx%10) / 10) + 10;
    
    myChart.options.scales.yAxes[0].ticks.max = getLargestInt(yValues)
    updatte();
    if (valuemtx == prevval) {
        document.getElementById('valuemtx').style.color = "black";
        document.getElementById('usd').style.color = "black";
        myChart.data.datasets[0].backgroundColor = "rgba(0,0,0,1.0)";
        myChart.data.datasets[0].borderColor = 'rgba(0,0,0,1.0)';
    } else if (valuemtx > prevval) {
        document.getElementById('valuemtx').style.color = "green";
        document.getElementById('usd').style.color = "green";
        myChart.data.datasets[0].backgroundColor = 'rgba(0, 128, 0, 1.0)';
        myChart.data.datasets[0].borderColor = 'rgba(0, 128, 0, 1.0)';
    } else if (valuemtx < prevval) {
        document.getElementById('valuemtx').style.color = "red";
        document.getElementById('usd').style.color = "red";
        myChart.data.datasets[0].backgroundColor = 'rgba(255, 0, 0, 1.0)';
        myChart.data.datasets[0].borderColor = 'rgba(255, 0, 0, 1.0)';

    }

    myChart.update();
    prevval = valuemtx;
}

function lsell(qty) {
    for (var i = 0; i < qty; i++) {
        valuemtx -= 0.1 * valuemtx; // Decrease by 10% for each sale
    }

    valuemtx = valuemtx.toFixed(2); // Ensure two decimal precision
    valuemtx = Number(valuemtx); // Convert back to number for further operations

    // Correctly increment xValues
    xValues.push(xValues[xValues.length - 1] + 1);
    yValues.push(valuemtx);

    // Update the chart's max value dynamically
    myChart.options.scales.yAxes[0].ticks.max = getLargestInt(yValues);

    // Update the UI and chart
    updatte();
    
    // Update the chart colors based on whether the value is increasing, decreasing, or staying the same
    if (valuemtx == prevval) {
        document.getElementById('valuemtx').style.color = "black";
        document.getElementById('usd').style.color = "black";
        myChart.data.datasets[0].backgroundColor = "rgba(0,0,0,1.0)";
        myChart.data.datasets[0].borderColor = 'rgba(0,0,0,1.0)';
    } else if (valuemtx > prevval) {
        document.getElementById('valuemtx').style.color = "green";
        document.getElementById('usd').style.color = "green";
        myChart.data.datasets[0].backgroundColor = 'rgba(0, 128, 0, 1.0)';
        myChart.data.datasets[0].borderColor = 'rgba(0, 128, 0, 1.0)';
    } else if (valuemtx < prevval) {
        document.getElementById('valuemtx').style.color = "red";
        document.getElementById('usd').style.color = "red";
        myChart.data.datasets[0].backgroundColor = 'rgba(255, 0, 0, 1.0)';
        myChart.data.datasets[0].borderColor = 'rgba(255, 0, 0, 1.0)';
    }

    myChart.update(); // Refresh the chart
    prevval = valuemtx; // Set the previous value to the current value
}

function p1buy_mtx() {
    request_amount = document.getElementById('input_mtx1').value;
    if (request_amount > 0 && request_amount <= max_transactionqtyMTX) {
        if (confirm(`Koszt będzie wynosić ${calculate_pricebuy_mtx(request_amount)}`) && money >= calculate_pricebuy_mtx(request_amount)) {
            
            amountmtx1 += parseInt(request_amount);
            money -= calculate_pricebuy_mtx(request_amount)
            updatte();
            influente = calculateinfluence_mtx(request_amount);
            
            if (influente > 0) {
                
                lbuy(influente);
            }

        } else {
            return;
        }
    } else {
        alert(`Maksymalna ilość transakcji wynosi ${max_transactionqtyMTX}`);
    }
}

function p1sell_mtx() {
    request_amount = document.getElementById('input_mtx1').value;
    if (request_amount > 0) {
        if (confirm(`Zysk będzie wynosić ${calculate_price_sell_mtx(request_amount)}`) && request_amount <= amountmtx1) {
            
            amountmtx1 -= parseInt(request_amount);
            money += calculate_price_sell_mtx(request_amount);
            updatte();
            influente = calculateinfluence_mtx(request_amount);
            if (influente > 0) {
                
                lsell(influente);
            }

        } else {
            return;
        }
    }
}

function p2buy_mtx() {
    request_amount = document.getElementById('input_mtx2').value;
    if (request_amount > 0 && request_amount <= max_transactionqtyMTX) {
        if (confirm(`Koszt będzie wynosić ${calculate_pricebuy_mtx(request_amount)}`)) {
            
            amountmtx2 += parseInt(request_amount);
            updatte();
            influente = calculateinfluence_mtx(request_amount);
            if (influente > 0) {
                alert(influente);
                lbuy(influente);
            }

        } else {
            return;
        }
    } else {
        alert(`Maksymalna ilość transakcji wynosi ${max_transactionqtyMTX}`);
    }
}

function p2sell_mtx() {
    request_amount = document.getElementById('input_mtx2').value;
    if (request_amount > 0) {
        if (confirm(`Zysk będzie wynosić ${calculate_price_sell_mtx(request_amount)}`)) {
            
            amountmtx2 -= parseInt(request_amount);
            updatte();
            influente = calculateinfluence_mtx(request_amount);
            if (influente > 0) {
                
                lsell(influente);
            }

        } else {
            return;
        }
    }
}

function p3buy_mtx() {
    request_amount = document.getElementById('input_mtx3').value;
    if (request_amount > 0 && request_amount <= max_transactionqtyMTX) {
        if (confirm(`Koszt będzie wynosić ${calculate_pricebuy_mtx(request_amount)}`)) {
            
            amountmtx3 += parseInt(request_amount);
            updatte();
            influente = calculateinfluence_mtx(request_amount);
            if (influente > 0) {
                
                lbuy(influente);
            }

        } else {
            return;
        }
    } else {
        alert(`Maksymalna ilość transakcji wynosi ${max_transactionqtyMTX}`);
    }
}

function p3sell_mtx() {
    request_amount = document.getElementById('input_mtx3').value;
    if (request_amount > 0) {
        if (confirm(`Zysk będzie wynosić ${calculate_price_sell_mtx(request_amount)}`)) {
            
            amountmtx3 -= parseInt(request_amount);
            updatte();
            influente = calculateinfluence_mtx(request_amount);
            if (influente > 0) {
                
                lsell(influente);
            }

        } else {
            return;
        }
    }
}

document.addEventListener('keydown', (e) => {
  if (e.code === "Space") {
      push();

      day += 1;
      document.getElementById('daycount').innerText = day;
      nw = usdvalmtx1 + usdval_xd1 + usdval_dn1 + money;
      document.getElementById('networth').innerText = nw;


  }
});

document.addEventListener('keydown', (e) => {
    if (e.code === "Enter") {
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();
        push();

  
        day += 100;
        document.getElementById('daycount').innerText = day;
        nw = usdvalmtx1 + usdval_xd1 + usdval_dn1 + money;
        document.getElementById('networth').innerText = nw;
  
  
    }
  });
  
