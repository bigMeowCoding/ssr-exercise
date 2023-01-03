import { sum } from "module1/sum";
function delay(time = 1000) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(true);
    }, time);
  });
}
async function fun() {
  await delay();
  await delay(2000);
  return sum(1, 2);
}
fun();
