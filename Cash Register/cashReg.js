function checkCashRegister(price, cash, cid) {

    let change = {};
    let due = (cash - price) * 100;
    let drawer = Object.fromEntries(cid);
    //x100 to avoid dealing with floats
    Object.keys(drawer).forEach(k => {
      drawer[k] *= 100;
      drawer[k] = Math.round(drawer[k])
    });
  
    let sum = Object.values(drawer).reduce((prev, curr) => prev + curr);
    
    if (sum < due) return {status: "INSUFFICIENT_FUNDS", change: []};
  
    while (due > 0) {
      if (due >= 10000 && drawer['ONE HUNDRED']) {
        due -= 10000;
        drawer['ONE HUNDRED'] -= 10000;
        change['ONE HUNDRED']
          ? change['ONE HUNDRED'] += 10000
          : change['ONE HUNDRED'] = 10000
  
      } else if (due >= 2000 && drawer['TWENTY']) {
        due -= 2000;
        drawer['TWENTY'] -= 2000;
        change['TWENTY']
          ? change['TWENTY'] += 2000
          : change['TWENTY'] = 2000
  
      } else if (due >= 1000 && drawer['TEN']) {
        due -= 1000;
        drawer['TEN'] -= 1000;
        change['TEN']
          ? change['TEN'] += 1000
          : change['TEN'] = 1000
          
      } else if (due >= 500 && drawer['FIVE']) {
        due -= 500;
        drawer['FIVE'] -= 500;
        change['FIVE']
          ? change['FIVE'] += 500
          : change['FIVE'] = 500
          
      } else if (due >= 100 && drawer['ONE']) {
        due -= 100;
        drawer['ONE'] -= 100;
        change['ONE']
          ? change['ONE'] += 100
          : change['ONE'] = 100
          
      } else if (due >= 25 && drawer['QUARTER']) {
        due -= 25;
        drawer['QUARTER'] -= 25;
        change['QUARTER']
          ? change['QUARTER'] += 25
          : change['QUARTER'] = 25
          
      } else if (due >= 10 && drawer['DIME']) {
        due -= 10;
        drawer['DIME'] -= 10;
        change['DIME']
          ? change['DIME'] += 10
          : change['DIME'] = 10
          
      } else if (due >= 5 && drawer['NICKLE']) {
        due -= 5;
        drawer['NICKLE'] -= 5;
        change['NICKLE']
          ? change['NICKLE'] += 5
          : change['NICKLE'] = 5
          
      } else if (due >= 1 && drawer['PENNY'] >= 0) {
        if (!drawer['PENNY'] && due) return {status: "INSUFFICIENT_FUNDS", change: []};
        
        due -= 1;
        drawer['PENNY'] -= 1;
        change['PENNY']
          ? change['PENNY'] += 1
          : change['PENNY'] = 1
          
      }
    }
    if (Object.values(drawer).every(value => value === 0)) {
      return {status: 'CLOSED', change: cid};
    } else {
      Object.keys(change).forEach(key => {
        change[key] /= 100;
      })
      return {status: 'OPEN', change: Object.entries(change)}
    }
  
  }
  
  checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
  
  console.log(Math.round(2.05 * 100))