import React, {useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import moment from "moment";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

const useCalendarStyle = makeStyles({
  root: {
    padding: 10,
    boxShadow: '0 4px 12px 1px #d4d4d4ab',
    zIndex: 10000000,
  },
  headerCalendar: {
    display: 'block',
    userSelect: 'none',
    height: 50,
  },
  headerCalendarContainer: {
    display: 'flex',
    height: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  monthLabelFont: {
    fontFamily: `'Open Sans', sans-serif`,
    color: '#4f4f4f',
    fontWeight: 700,
  },
  yearLabel: {
    color: '#989898',
    marginLeft: 6
  },
  daysContainer: {
    display: 'block',
    textTransform: 'uppercase',
    userSelect: 'none',
  },
  dayNames: {
    display: 'flex',
    color: '#4f4f4f',
    fontSize: '0.875rem',
    fontFamily: `'Quicksand', sans-serif`
  },
  dayHeaderFixed: {
    display: 'flex',
    alignItems: 'center',
    fontFamily: `'Quicksand', sans-serif`,
    flex: 1,
    height: 50,
    fontWeight: 'bolder',
    justifyContent: 'center',
  },
  day: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: `'Quicksand', sans-serif`,
    flex: 1,
    height: 50,
    textAlign: 'center',
    cursor: 'pointer',
    borderRadius: 1.5,
    transition: '0.8s',
    padding: '0 15px',
    '&:hover': {
      boxShadow: '0 3px 12px 1px #1076e34d',
      borderRadius: 8,
    }
  },
  weekContainer: {
    background: 'white',
    display: 'flex',
  },
  today: {
    position: 'relative',
    color: '#0094ff',
    fontWeight: 700,
    borderBottom: '2px solid #0094ff75',
    '&:hover': {
      background: 'transparent',
      color: '#000000',
      borderBottom: '1px solid white'
    }
  },
  diferentMonth: {
    color: '#989898',
  },
  beforeDate: {
    color: '#989898',
    userSelect: 'none',
    cursor: 'default',
    '&:hover': {
      boxShadow: 'none',
    }
  },
  isSelected: {
    background:'#047ea24d'
  },
});

function Calendar(props) {
  const classes = useCalendarStyle();
  const [monthCount, setMonthCount] = useState(true);
  const [month, setMonth] = useState(moment());
  const [selected, setSelected] = useState(moment());

  const nextMonth = () => {
    const newMonth = month.add(1, 'month');
    setMonth(newMonth)
    setMonthCount(!monthCount);
  }

  const prevMonth = () => {
    const newMonth = month.subtract(1, 'month');
    setMonth(newMonth);
    setMonthCount(!monthCount);
  }

  const selectNumber = (day) => {
    setSelected(day.date);
  }

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
          select={(day) => props.selectedDay(day)}
          selectBefore={(day) => selectNumber(day)}
          selected={selected}
        />
      );

      date.add(1, 'w');

      done = count++ > 2 && monthIndex !== date.month();
      monthIndex = date.month();
    }

    return weeks;

  }

  const monthLabel = () => {
    switch (month.month()) {
      case 0: return 'Enero';
      case 1: return 'Febrero';
      case 2: return 'Marzo';
      case 3: return 'Abril';
      case 4: return 'Mayo';
      case 5: return 'Junio';
      case 6: return 'Julio';
      case 7: return 'Agosto';
      case 8: return 'Septiembre';
      case 9: return 'Octubre';
      case 10: return 'Noviembre';
      case 11: return 'Diciembre';
      default:
        break;
    }
  }

  return (
    <div className={classes.root}>
      <header className={classes.headerCalendar}>
        <div className={classes.headerCalendarContainer}>
          {month.isBefore(moment().add(1, 'month'), 'month') ? (<div />) : (
            <div style={{paddingTop:5,cursor:'pointer'}} onClick={prevMonth}><ChevronLeftIcon /></div>
          )}
          <div>
            <span className={classes.monthLabelFont}>{monthLabel()}</span>
            <span className={classes.yearLabel}>{month.format('YYYY')}</span>
          </div>
          <div style={{paddingTop:5,cursor:'pointer'}} onClick={nextMonth}><ChevronRightIcon /></div>
        </div>
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

function DayNames() {
  const classes = useCalendarStyle();
  return (
    <div className={classes.dayNames}>
      <div className={classes.dayHeaderFixed}>
        <div>Dom</div>
      </div>
      <div className={classes.dayHeaderFixed}>
        <div>Lun</div>
      </div>
      <div className={classes.dayHeaderFixed}>
        <div>Mar</div>
      </div>
      <div className={classes.dayHeaderFixed}>
        <div>Mie</div>
      </div>
      <div className={classes.dayHeaderFixed}>
        <div>Jue</div>
      </div>
      <div className={classes.dayHeaderFixed}>
        <div>Vie</div>
      </div>
      <div className={classes.dayHeaderFixed}>
        <div>Sab</div>
      </div>
    </div>
  );
}

function indexedDays(values) {
  let days = [];
  
  let {date} = values;
  const {month, select, selectBefore, selected} = values;
  
  for (var i = 0; i < 7; i++) {
    let day = {
      name: date.format("dd").substring(0, 1),
      number: date.date(),
      isCurrentMonth: date.month() === month.month(),
      isToday: date.isSame(new Date(), "day"),
      isBeforeToday: date.isBefore(moment().subtract(1, 'd'), 'daybefore'),
      date: date,
      id: date.date()
    };
    days.push(
      <Day key={date} day={day} select={select} 
      selectBefore={selectBefore} selected={selected} />
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
    day,
    day: { date, isCurrentMonth, isToday, number, id, isBeforeToday },
    select,
    selected,
    selectBefore
  } = props;

  return (
    <span
      key={date.date() + moment().month() + id}
      id={date.month() + number}
      className={
        classes.day +
        (isToday ? ` ${classes.today}` : '') +
        (isCurrentMonth ? '' : ` ${classes.diferentMonth}`) +
        (isBeforeToday ? ` ${classes.beforeDate}` : '') +
        (date.isSame(selected) ? ` ${classes.isSelected}` : '')
      }
      onClick={isBeforeToday ? null : () => {select(day); selectBefore(day);}}
    >
      {number}
    </span>
  );
}

export default Calendar;