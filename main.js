const convertMoney = (rate, sum) => parseFloat((rate * sum).toFixed(2));
const selectedCart = [
  { price: 20 },
  { price: 45 },
  { price: 67 },
  { price: 1305 },
];

async function calculateCart(cart) {
  return cart.map((v) => v.price).reduce((sum, price, i) => sum + price, 0);
}

function fetchRates(
  url = "https://openexchangerates.org/api/latest.json?app_id=18ed0acb6c19404198f4c1cafef81ef3"
) {
  return fetch(url).then((response) =>
    response.json().then((result) => result.rates)
  );
}

function calculateAndConvertCart(cart) {
  return Promise.all([fetchRates(), calculateCart(cart)])
    .then((values) => ({
      rates: values[0],
      totalSum: values[1],
    }))
    .then((pack) => ({
      rubles: convertMoney(pack.rates["RUB"], pack.totalSum),
      euros: convertMoney(pack.rates["EUR"], pack.totalSum),
      ["USD dollars"]: convertMoney(1, pack.totalSum),
      pounds: convertMoney(pack.rates["GBP"], pack.totalSum),
      yens: convertMoney(pack.rates["JPY"], pack.totalSum),
    }));
}

const totalCartPrice = calculateAndConvertCart(selectedCart).then((result) =>
  console.log(
    "Start from this selectedCart: ",
    selectedCart,
    "\nConverted and calculated totalCartPrice is ",
    result
  )
);
