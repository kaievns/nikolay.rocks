var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default class PageDate extends React.Component {
  render() {
    var date  = this.props.date;
    var year  = date.getFullYear();
    var month = months[date.getMonth()];
    var day   = date.getDate();

    if (year) {
      return (
        <div className="date">{month} {day}, {year}</div>
      );
    } else {
      return null;
    }

  }
}
