// 'use strict';
window.onload=function(){
  onPriceChange();
}

// 定义函数
function $(id) {
  return document.getElementById(id);
}

function PMT(ir, np, pv, fv) {
  /*
        ir - interest rate per month
        np - number of periods (months)
        pv - present value
        fv - future value (residual value)
        */
  pmt =
    (ir * (pv * Math.pow(ir + 1, np) + fv)) /
    ((ir + 1) * (Math.pow(ir + 1, np) - 1));
  return pmt;
}

var data = [
  {
    name: "Total Asset",
    cn: "个人总资产",
    column: 1,
    row: 1,
    children: [
      {
        name: "现金总额",
        id: "TA_net",
        value: 0,
        min: 0,
        max: null,
        step: 1,
        unit: "万",
        type: "input",
      },
      {
        name: "公积金余额",
        id: "TA_fund",
        value: 0,
        min: 0,
        max: null,
        step: 1,
        unit: "万",
        type: "input",
      },
    ],
  },
  {
    name: "monthlyIncome",
    cn: "个人月收入",
    column: 3,
    row: 1,
    children: [
      {
        name: "月工资收入",
        id: "MI_wage",
        value: 0,
        min: 0,
        max: null,
        step: 100,
        unit: "元",
        type: "input",
      },
      {
        name: "月公积金收入",
        id: "MI_fund",
        value: 0,
        min: 0,
        max: 7040,
        step: 1,
        unit: "元",
        type: "input",
      },
    ],
  },
  {
    name: "totalExpendData",
    cn: "房贷支出",
    column: 1,
    row: 2,
    children: [
      {
        name: "房屋总价",
        id: "H_total_price",
        value: 350,
        min: 0,
        max: 500,
        step: 1,
        unit: "万",

        type: "input",
      },
      {
        name: "契税",
        id: "H_deedTax",
        value: null,
        unit: "万",
        type: "text",
      },
      {
        name: "首付比例",
        id: "H_down_payment_rate",
        value: 30,
        min: 0,
        max: 90,
        step: 10,
        unit: "%",
        type: "input",
      },
      {
        name: "首付金额",
        id: "H_down_payment",
        value: null,
        unit: "万",
        type: "text",
      },
      {
        name: "贷款总额",
        id: "H_total_loan",
        value: null,
        unit: "万",
        type: "text",
      },
      {
        name: "贷款年限",
        id: "H_loan_period",
        value: 30,
        min: 0,
        max: 30,
        step: 1,
        unit: "年",
        type: "input",
      },
      {
        name: "商贷总额",
        id: "H_loan",
        value: null,
        unit: "万",
        type: "text",
      },
      {
        name: "商贷利率LRP",
        id: "H_loan_rate",
        value: 4.65,
        min: 0,
        max: 100,
        step: 0.01,
        unit: "%",
        type: "input",
      },
      {
        name: "公积金贷总额",
        id: "H_fund",
        value: 50,
        min: 0,
        max: 50,
        step: 1,
        unit: "万",
        type: "input",
      },
      {
        name: "公积金利率",
        id: "H_fund_rate",
        value: 3.25,
        min: 0,
        max: 100,
        step: 0.01,
        unit: "%",
        type: "input",
      },
      {
        name: "iHome贷款",
        id: "iHome",
        value: 40,
        min: 0,
        max: 40,
        step: 10,
        unit: "万",
        type: "input",
      },
      {
        name: "自掏资金",
        id: "myPayment",
        value: null,
        unit: "万",
        type: "text",
      },
      {
        name: "车位金额",
        id: "PP_money",
        value: 35,
        min: 0,
        max: null,
        step: 1,
        unit: "万",
        type: "input",
      },
      {
        name: "车位首付",
        id: "PP_down_payment",
        value: 2,
        min: 0,
        max: null,
        step: 1,
        unit: "万",
        type: "input",
      },
      {
        name: "车位商贷利率",
        id: "PP_loan_rate",
        value: 4.9,
        min: 0,
        max: 10,
        step: 0.01,
        unit: "%",
        type: "input",
      },
      {
        name: "车位贷款年限",
        id: "PP_loan_period",
        value: 10,
        min: 0,
        max: 10,
        step: 1,
        unit: "年",
        type: "input",
      },
      {
        name: "车位商贷金额",
        id: "PP_loan",
        value: null,
        unit: "万",
        type: "text",
      },
    ],
  },
  {
    name: "carLoan",
    cn: "车贷支出",
    column: 2,
    row: 2,
    children:[
      {
        name: "车贷总额",
        id: "CL_total",
        value: 25,
        min: 0,
        max: null,
        step: 1,
        unit: "万",
        type: "input",
      },{
        name: "车贷年限",
        id: "CL_period",
        value: 3,
        min: 0,
        max: null,
        step: 1,
        unit: "年",
        type: "input",
      },{
        name: "车贷利率",
        id: "CL_rate",
        value: 3.72,
        min: 0,
        max: null,
        step: 1,
        unit: "%",
        type: "input",
      }
    ]
  },
  {
    name: "expendDetail",
    cn: "月供计算",
    column: 2,
    row: 3,
    children: [
      {
        name: "iHome月供",
        id: "MP_iHome",
        value: null,
        unit: "元",
        type: "text",
      },
      {
        name: "公积金月供",
        id: "MP_fund",
        value: null,
        unit: "元",
        type: "text",
      },
      {
        name: "商贷月供",
        id: "MP_loan",
        value: null,
        unit: "元",
        type: "text",
      },
      {
        name: "车贷月供",
        id: "MP_car",
        value: null,
        unit: "元",
        type: "text",
      },
      {
        name: "车位月供",
        id: "MP_parking_place",
        value: null,
        unit: "元",
        type: "text",
      },
      {
        name: "合计月供",
        id: "MP_total",
        value: null,
        unit: "元",
        type: "text",
      },
    ],
  },
  {
    name: "myMonthlyExpend",
    cn: "个人月支出",
    column: 3,
    row: 2,
    children: [
      {
        name: "月生活成本",
        id: "monthlyLifeCost",
        value: 0,
        min: 0,
        max: null,
        step: 1,
        unit: "元",
        type: "input",
      },
      {
        name: "月房租成本",
        id: "monthlyRentCost",
        value: 0,
        min: 0,
        max: null,
        step: 1,
        unit: "元",
        type: "input",
      }
    ],
  },{
    name: "myMonthlyBalance",
    cn: "个人月结余",
    column: 3,
    row: 3,
    children: [
      {
        name: "每月结余",
        id: "monthBalance",
        value: null,
        unit: "元",
        type: "text",
      }
    ],
  },
  {
    name: "myTotalBalance",
    cn: "个人资产结余",
    column: 1,
    row: 3,
    children: [
      {
        name: "剩余资产",
        id: "remainingAssets",
        value: 0,
        unit: "万",
        type: "text",
      },
    ],
  },
];

function Result() {
  // ShowChart($('H_total_price').value);
  const arr = data.map((a, index) => (
    <div 
    key={index} 
    className="items"
    style={{
      gridColumnStart:a.column,
      gridRowStart: a.row 
      }}
    >
      <h4>{a.cn}</h4>
      {a.children.map((e, index) => (
        <label 
        key={index} 
        htmlFor={e.id} 
        className="item" 
        >
          <span className="label">{e.name}：</span>
          {e.type == "input" ? (
            <input
              type="number"
              className="value"
              id={e.id}
              defaultValue={e.value}
              min={e.min}
              max={e.max}
              step={e.step}
              onChange={(e) => onPriceChange(e.target)}
            />
          ) : (
            <span id={e.id} className="value">
              {e.value ? e.value : "-"}
            </span>
          )}
          <span className="unit">{e.unit}</span>
        </label>
      ))}
    </div>
  ));
  return <div className="myForm">{arr}</div>;
}

ReactDOM.render(<Result />, document.getElementById("container"));

// 金额计算
function onPriceChange(e) {
  console.log(`当前点击：${e}`);

  // 
  // 获取 Input 的数据
  // 

  // 净资产 Total Assets
  // 总资产
  const TA_net = $("TA_net").value;
  // 公积金余额
  const TA_fund = $("TA_fund").value;

  // 月收入 Monthly Income
  // 月工资收入
  const MI_wage = $("MI_wage").value;
  // 月公积金收入
  const MI_fund = $("MI_fund").value;
  
  // 房屋总价 House
  const H_total_price = $("H_total_price").value;
  // 首付比例
  const H_down_payment_rate = $("H_down_payment_rate").value / 100;
  // 贷款年限
  const H_loan_period = $("H_loan_period").value * 12;
  // 商贷月利率（千分位）
  const H_loan_rate = $("H_loan_rate").value / 1000;
  // 公积金贷款总额
  const H_fund = $("H_fund").value;
  // 公积金利率（千分位）
  const H_fund_rate = $("H_fund_rate").value / 1000;
  // iHome贷款
  const iHome = $("iHome").value;

  // 车位 Parking place
  // 车位金额
  const PP_money = $("PP_money").value;
  // 车费首付
  const PP_down_payment = $("PP_down_payment").value;
  // 车位商贷利率（千分位）
  const PP_loan_rate = $("PP_loan_rate").value / 1000;
  // 车位贷款年限
  const PP_loan_period = $("PP_loan_period").value * 12;

  // 车贷 Car Loan
  // 车贷总额
  const CL_total = $("CL_total").value;
  // 车贷年限
  const CL_period = $("CL_period").value * 12;
  // 车贷利率
  const CL_rate = $("CL_rate").value / 1000;

  //
  // 计算并返回结果
  //
  // 契税
  const H_deedTax = $("H_deedTax").innerHTML = (H_total_price * 0.015).toFixed(2);
  // 贷款总额
  const H_total_loan = ($("H_total_loan").innerHTML = ( H_total_price * (1 - H_down_payment_rate) ).toFixed(2));
  // 首付金额
  const H_down_payment = ($("H_down_payment").innerHTML = ( H_total_price * H_down_payment_rate ).toFixed(2));
  // 自掏资金
  const myPayment = ($("myPayment").innerHTML = H_down_payment - iHome).toFixed(2);
  // 商贷总额
  const H_loan = ($("H_loan").innerHTML = (
    H_total_loan - H_fund
  ).toFixed(2));
  // 车位商贷金额
  const PP_loan = ($("PP_loan").innerHTML = parseInt(PP_money) - parseInt(PP_down_payment));

  // 月供计算 Monthly Payments
  // iHome月供
  const MP_iHome = ($("MP_iHome").innerHTML = ( (iHome / 4 / 12) * 10000 ).toFixed(0));
  // 公积金月供
  const MP_fund = ($("MP_fund").innerHTML = ( PMT(H_fund_rate, H_loan_period, H_fund, 0) * 10000 ).toFixed(0));
  // 商业贷款月供
  const MP_loan = ($("MP_loan").innerHTML = ( PMT(H_loan_rate, H_loan_period, H_loan, 0) * 10000 ).toFixed(0));
  // 车贷月供
  const MP_car = ($("MP_car").innerHTML = ( PMT(CL_rate, CL_period, CL_total, 0) * 10000 ).toFixed(0));
  // 车位月供
  const MP_parking_place = ($("MP_parking_place").innerHTML = ( PMT(PP_loan_rate, PP_loan_period, PP_loan, 0) * 10000 ).toFixed(0));
  // 合计月供
  const MP_total = ($("MP_total").innerHTML = parseInt(MP_iHome) + parseInt(MP_fund) + parseInt(MP_car) + parseInt(MP_parking_place) + parseInt(MP_loan));

  // 个人月结余计算
  // 月生活成本 Monthly Cost
  const MC_life = $("monthlyLifeCost").value;
  // 月房租成本
  const MC_rent = $("monthlyRentCost").value;
  // 每月结余
  $("monthBalance").innerHTML = parseInt(MI_wage) + parseInt(MI_fund) - parseInt(MP_total) - parseInt(MC_life) - parseInt(MC_rent);

  // 总资产剩余计算
  const remainingAssets = ($("remainingAssets").innerHTML = parseInt(TA_net) + parseInt(TA_fund) - parseInt(H_down_payment));
}

// 渲染贷款图表
// function ShowChart(e) {
//   // onPriceChange($('H_total_price').value);
//   var chartDom = document.getElementById("main");
//   var myChart = echarts.init(chartDom);
//   var option;
//   Calc(e);
//   option = {
//     title: {
//       text: "贷款",
//     },
//     tooltip: {
//       trigger: "item",
//       triggerOn: "mousemove",
//     },
//     animationDurationUpdate: 1500,
//     animationEasingUpdate: "quinticInOut",
//     series: {
//       type: "sankey",
//       layout: "none",
//       emphasis: {
//         focus: "adjacency",
//       },
//       nodeAlign: "left",
//       lineStyle: {
//         color: "gradient",
//         curveness: 0.5,
//       },
//       data: [
//         {
//           name: "总支出",
//         },
//         {
//           name: "契税",
//         },
//         {
//           name: "车位费",
//         },
//         {
//           name: "车位定金",
//         },
//         {
//           name: "车位贷款",
//         },
//         {
//           name: "房屋总价",
//         },
//         {
//           name: "3首付金额",
//         },
//         {
//           name: "贷款总额",
//         },
//         {
//           name: "iHome贷款",
//         },
//         {
//           name: "自掏资金",
//         },
//         {
//           name: "公积金贷款",
//         },
//         {
//           name: "商业贷款",
//         },
//       ],
//       links: [
//         // {
//         //   source: "总支出",
//         //   target: "契税",
//         //   value: H_deedTax,
//         // },
//         // {
//         //   source: "总支出",
//         //   target: "契税",
//         //   value: deedTax,
//         // },
//         // {
//         //   source: "总支出",
//         //   target: "车位费",
//         //   value: carport,
//         // },
//         // {
//         //   source: "总支出",
//         //   target: "房屋总价",
//         //   value: H_total_price,
//         // },
//         {
//           source: "房屋总价",
//           target: "首付金额",
//           value: down_payment_,
//         },
//         {
//           source: "房屋总价",
//           target: "贷款总额",
//           value: loans,
//         },
//         {
//           source: "首付金额",
//           target: "自掏资金",
//           value: myPay,
//         },
//         {
//           source: "首付金额",
//           target: "iHome贷款",
//           value: iHome,
//         },
//         {
//           source: "贷款总额",
//           target: "商业贷款",
//           value: commercialLoans,
//         },
//         {
//           source: "贷款总额",
//           target: "公积金贷款",
//           value: H_fund,
//         },
//         {
//           source: "车位费",
//           target: "车位定金",
//           value: carportEarnest,
//         },
//         {
//           source: "车位费",
//           target: "车位贷款",
//           value: carportLoans,
//         },
//       ],
//     },
//   };

//   option && myChart.setOption(option);
// }
