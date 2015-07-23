function DataShow(currentDate) {
  this.year = this.dateDigitToString(currentDate.getFullYear());
  this.month = this.dateDigitToString(currentDate.getMonth() + 1);
  this.date = this.dateDigitToString(currentDate.getDate());
  this.hour = this.dateDigitToString(currentDate.getHours());
  this.minute = this.dateDigitToString(currentDate.getMinutes());
  this.second = this.dateDigitToString(currentDate.getSeconds());
  this.formattedDateString = this.year + '年' + this.month + '月' + this.date + '日 '
      + this.hour + ':' + this.minute + ':' + this.second;
}

DataShow.prototype.dateDigitToString = function (num) {
  return num < 10 ? '0' + num : num;
};

