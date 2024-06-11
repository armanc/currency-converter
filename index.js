var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fetch from "node-fetch";
import prompts from "prompts";
const fetchExchangeRates = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch("https://api.coingecko.com/api/v3/exchange_rates");
    const data = (yield response.json());
    // console.log(Object.entries(data.rates));
    const exchangeRates = Object.entries(data.rates).map(([symbol, rate]) => ({
        symbol: symbol,
        name: rate.name,
        value: rate.value,
    }));
    return exchangeRates;
});
const app = () => __awaiter(void 0, void 0, void 0, function* () {
    const exchangeRates = yield fetchExchangeRates();
    const response = yield prompts([
        {
            type: "select",
            name: "fromCurrency",
            message: "Select currency to converet from: ",
            choices: exchangeRates.map((exchangeRate) => {
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
            choices: exchangeRates.map((exchangeRate) => {
                return {
                    title: exchangeRate.name,
                    value: exchangeRate
                };
            }),
        },
    ]);
    console.log(response);
    const btcValue = response.amount / response.fromCurrency.value;
    const endCurrencyValue = response.toCurrency.value * btcValue;
    console.log("Tavi " + response.amount + " " + response.fromCurrency.symbol + " ir " + btcValue + " btc. Konverējot tos uz " + response.toCurrency.symbol + " tiks iegūti " + endCurrencyValue + " " + response.toCurrency.symbol);
    console.log("");
});
app();
