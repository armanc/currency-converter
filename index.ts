import fetch from "node-fetch";
import prompts from "prompts";

type ExchangeRate = {
  name: string;
  symbol: string;
  value: number;
};

type ExchangeRateResponse = {
  rates: ExchangeRate[];
};

const fetchExchangeRates = async (): Promise<ExchangeRate[]> => {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/exchange_rates"
  );
  const data = (await response.json()) as ExchangeRateResponse;
  // console.log(Object.entries(data.rates));

  const exchangeRates: ExchangeRate[] = Object.entries(data.rates).map(
    ([symbol, rate]) => ({
      symbol: symbol,
      name: rate.name,
      value: rate.value,
    })
  );

  return exchangeRates;
};

const app = async () => {
  const exchangeRates: ExchangeRate[] = await fetchExchangeRates();

  const response = await prompts([
    {
      type: "select",
      name: "fromCurrency",
      message: "Select currency to converet from: ",
      choices: exchangeRates.map((exchangeRate: ExchangeRate) => {
        return {
          title: exchangeRate.name,
          value: exchangeRate,
        };
      }),
    },
    {
      type: "number",
      name: "amount",
      message: "How much?",
    },
    {
      type: "select",
      name: "toCurrency",
      message: "Select currency to converet from: ",
      choices: exchangeRates.map((exchangeRate: ExchangeRate) => {
        return {
          title: exchangeRate.name,
          value: exchangeRate
        };
      }),
    },
  ]);
  // console.log(response);
  const btcValue = response.amount / response.fromCurrency.value;
  const endCurrencyValue = response.toCurrency.value * btcValue;
  console.log("Your "+response.amount+" "+response.fromCurrency.symbol+" are "+btcValue+" btc. By converting that to "+response.toCurrency.symbol+" you will recieve "+endCurrencyValue+" "+response.toCurrency.symbol);
};

app();