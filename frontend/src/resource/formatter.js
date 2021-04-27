export function formatMoney(money) {
    if (money >= 1000) {
      return `Rp${Math.floor(money / 1000)}.${
        money % 1000 < 10
          ? `00${money % 1000}`
          : money % 1000 < 100
          ? `0${money % 1000}`
          : money % 1000
      }`;
    } else {
      return `Rp${money}`;
    }
  }

export function formatDate(date) {
  const d = new Date(date);
  var month = (d.getMonth()+1) < 10 ? `0${(d.getMonth()+1)}` : (d.getMonth()+1);
  var day = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
  var year = d.getFullYear().toString().slice(-2);
  return `${day}/${month}/${year}`;
  
  // date = new Date(date).toLocaleString('en-US', { timeZone: 'Asia/Jakarta'});
  // return date = date.slice(0, date.indexOf(","));
}

export function formatTime(date) {
  const d = new Date(date);
  var jam = d.getHours() < 10 ? `0${d.getHours()}` : d.getHours();
  var menit = d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes();
  var detik = d.getSeconds() < 10 ? `0${d.getSeconds()}` : d.getSeconds();
  return `${jam}:${menit}:${detik} WIB`;
  
  // date = new Date(date).toLocaleString('en-US', { timeZone: 'Asia/Jakarta'});
  // return date = date.slice(0, date.indexOf(","));
}