# Crypto Currencies Converter

Simple crypto currrency converter

Using CoinGecko API which returns BTC-to-currency exchange rates. Since API has some request limit, stored response is present as well in exchange_rates.json and you can use it as fallback in case if something goes wrong.

Example user journey:
* select currency to convert from
* select amount
* select currency to convert to
* see the result

---

tsc --init
npm install --save prompts

npm i --save-dev @types/node
