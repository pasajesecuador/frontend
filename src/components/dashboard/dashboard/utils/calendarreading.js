import React, {useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import moment from "moment";

const useCalendarStyle = makeStyles({
  root: {
    padding: 10,
    background: 'black',
  },
  headerCalendar: {
    display: 'block',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: '1.4rem',
    userSelect: 'none',
    color: 'rgba(255, 255, 255, 0.884)',
    textShadow: '0 0 2px white',
  },
  daysContainer: {
    display: 'block',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: '1.4rem',
    userSelect: 'none',
    color: 'rgba(255, 255, 255, 0.884)',
    textShadow: '0 0 2px white',
  },
  dayNames: {
    color: '#f50057',
    fontSize: '0.875rem',
    fontWeight: 'bold',
    textShadow: '0 0 10px #f50057',
    lineHeight: '1.46429em',
  },
  day: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    height: 50,
    textAlign: 'center',
    cursor: 'pointer',
    borderRadius: 1.5,
    transition: '0.8s'
  },
  weekContainer: {
    background: 'white',
    display: 'flex',
  }
});

function Calendar() {
  const classes = useCalendarStyle();
  const [month] = useState(moment());

  const weekComponent = () => {
    let weeks = [];
    let done = false;
    let date = month
      .clone()
      .startOf("month")
      .add("w" - 1)
      .day("Sunday");
    let count = 0;
    let monthIndex = date.month();

    while(!done) {
      weeks.push(
        <Week
          key={date}
          date={date.clone()}
          month={month}
        />
      );

      date.add(1, 'w');

      done = count++ > 2 && monthIndex !== date.month();
      monthIndex = date.month();
    }

    return weeks;

  }

  return (
    <div className={classes.root}>
      <header className={classes.headerCalendar}>
        Calendario
      </header>
      <div className={classes.daysContainer}>
        <DayNames classes={classes} />
      </div>
      <div>
        {weekComponent()}
      </div>
    </div>
  );
}

function DayNames(classes) {
  return (
    <div className={classes.dayNames}>
      <span className={classes.day}>Dom</span>
      <span className={classes.day}>Lun</span>
      <span className={classes.day}>Mar</span>
      <span className={classes.day}>Mie</span>
      <span className={classes.day}>Jue</span>
      <span className={classes.day}>Vie</span>
      <span className={classes.day}>Sab</span>
    </div>
  );
}

function indexedDays(values) {
  let days = [];
  
  let {date} = values;
  const {month} = values;
  
  for (var i = 0; i < 7; i++) {
    let day = {
      name: date.format("dd").substring(0, 1),
      number: date.date(),
      isCurrentMonth: date.month() === month.month(),
      isToday: date.isSame(new Date(), "day"),
      date: date,
      id: date.date()
    };
    days.push(
      <Day key={date} day={day} />
    );

    date = date.clone();
    date.add(1, "day");
  }

  return days;
}

function Week(props) {
  const classes = useCalendarStyle();
  const days = indexedDays(props)
  
  return(
    <div className={classes.weekContainer} key={days[0]}>
      {days}
    </div>
  );
}

function Day(props) {
  const classes = useCalendarStyle();
  const {
    day: { date, isCurrentMonth, isToday, number, id },
  } = props;

  return(
    <span
      key={date.date() + moment().month() + id}
      id={date.month() + number}
      className={
        classes.day +
        (isToday ? " today" : "") +
        (isCurrentMonth ? "" : " different-month")
      }
    >
      {number}
    </span>
  );
}

export default Calendar;