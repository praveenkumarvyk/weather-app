// const proxyurl = "https://cors-anywhere.herokuapp.com/";
// const url = `http://api.apixu.com/v1/history.json?key=${key}&q=${q}&dt=${day}`;
// fetch(proxyurl + url, {
//   method: "get",
//   headers: {
//     "Content-Type": "application/json",
//     "Access-Control-Allow-Origin": "*"
//   }
// })
//   .then(res => res.json())
//   .then(data =>
//     this.setState({
//       country_list: data.map(list => list[1])
//     })
//   );