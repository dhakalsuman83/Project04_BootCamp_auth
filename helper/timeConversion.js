function timeConversion(time) {
    console.log(time)
    var temp = time.split(':');
    time = temp.join('');
    return +time;
}
module.exports = timeConversion

// const time = "12:12:12";
// temp = time.split(":");
// console.log(temp.join(''))