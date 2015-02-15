
//sample JSON.title mock data stored as var rofl
//!! Be sure to change func inputs to real data later
var rofl = "15.02.13 12:00 ROYAL HAWAIIAN BAND AT IOLANI PALACE - Friday February 13, 2015 from 12:00 pm to 1:00 pm @ Iolani Palace";




// Takes JSON.title and finds location, eventName, date, and time
function parseString(objString) {
  var thisEvent = {};
  var stringyThing = JSON.stringify(objString);

  // INTERNAL VAR: TIME-TO-COMPARE
  timeFrameStart = stringyThing.slice(10,15);

  // LOCATION
  thisEvent.location = stringyThing.slice(stringyThing.indexOf('@')).slice(2, -1);
  //console.log("Location:",location);

  stringyThing = stringyThing.substr(0, stringyThing.indexOf('@')-1).slice(16); //-1 to eat space

  // EVENT NAME
  thisEvent.eventName = stringyThing.slice(0, stringyThing.lastIndexOf('-')-1); //-1 to eat space
  //console.log("Event Name:",eventName);

  var dateString = stringyThing.slice( (stringyThing.lastIndexOf('-') + 2));
  var timeFrame = dateString.slice(dateString.lastIndexOf('from'));

  // DATE
  thisEvent.dateString = dateString.slice(0, dateString.lastIndexOf('from'));
  //console.log("Date:",dateString);

  // TIME
  thisEvent.timeFrame = timeFrame.slice(5);
  //console.log("Timeframe:",timeFrame);

  thisEvent.timeFrameEnd = timeFrame.slice( (thisEvent.timeFrame.indexOf('to') + 3));
  //thisEvent.timeFrameEnd = crappyMethodtoHelpConvertPMToMilTime(thisEvent.timeFrameEnd);

  // EVENT DURATION
  //thisEvent.eventDuration = eventDurationFinder();
  //console.log("Event Duration:", eventDuration);

}
/*
//func that finds out how many hours:minutes an event lasts based on start:finish
function eventDurationFinder() {

  var startHours = timeFrameStart.slice(0,timeFrameStart.indexOf(':'));
  var endingHours = timeFrameEnd.slice(0,timeFrameEnd.indexOf(':'));
  var startMinutes = timeFrameStart.slice(timeFrameStart.indexOf(':')+1);
  var endMinutes = timeFrameEnd.slice(timeFrameEnd.indexOf(':')+1);
  var duraMinutes;

  if(startMinutes === '00'){
    startMinutes = 60;
  }
  if(endMinutes === '00'){
    endMinutes = 60;
  }
  if(startMinutes>endMinutes){
    duraMinutes = startMinutes - endMinutes;
  } else {
    duraMinutes = endMinutes - startMinutes;
  }

  duraMinutes = duraMinutes.toString();
  if( duraMinutes === "0"){
    duraMinutes += "0";
  }

  //dura is now the hours:minutes of the event
  var dura = (parseInt(endingHours) - parseInt(startHours)).toString();
  dura = dura.concat(":").concat(duraMinutes);
  return dura;
}*/
/*
// crappy helper func that takes a PM time and converts to 24H time
function crappyMethodtoHelpConvertPMToMilTime( stringToUse ) {

  if(stringToUse.indexOf('pm') !== -1){

    var hours = stringToUse.slice(0,stringToUse.indexOf(':')).trim();
    var minutes = stringToUse.slice(stringToUse.indexOf(':'), stringToUse.indexOf(' ')).trim();

    if(hours === "12"){
      hours = "12:00";
      return hours;
    }
    hours = parseInt(hours)+12;
    return hours.toString().concat(minutes);

  }
  return stringToUse;
}

//function to test whether a given time falls within the event range. Returns TRUE if there's a time conflict
function timeCompare(){

  var currentTime = new Date();
  var startTimeInt = timeFrameStart.slice(0,timeFrameStart.indexOf(":"));
  var endTimeInt = timeFrameEnd.slice(0,timeFrameEnd.indexOf(":"));
  currentTime = currentTime.getHours() +":"+ currentTime.getMinutes();
  //console.log("Current Time:",currentTime);

  var currentTimeHour = parseInt(currentTime.slice(0, currentTime.indexOf(":")));

  if( currentTimeHour < startTimeInt ) {
    //console.log("Event hasn't happened yet.");
    return 1
  }
  else if( currentTimeHour > endTimeInt ) {
    //console.log("Event has already occurred.");
    return -1;
  }
  else if( currentTimeHour > startTimeInt && currentTimeHour < endTimeInt){
    //console.log("TIME CONFLICT");
    return 0;
  }
}

//FUNC CALLS HERE
parseString(rofl);
timeCompare(rofl);
*/