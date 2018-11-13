const sortEvents = function(array) {
    
    // iterates through array and changes date to timestamp
    let i = 0;
    for (i = 0; i < array.length; i++) {
        let x = new Date(array[i].date);
        let y = x.getTime();
        array[i].date = y;
    }
    
    // sorts the array's timestamps from lowest to highest
    array.sort(function(a,b) {
        a = a.date;
        b = b.date;
        return a<b ? -1 : a>b ? 1 : 0;
     });
     
    // iterates through array and changes date from timestamp to formatted string
    i = 0;
    for (i = 0; i < array.length; i++) {
        //let z = new Date(1352851200000);
        let z = new Date(array[i].date);
        let a = z.toString();
        let b = a.split(" ");
        let month = b[1];
        switch (month) {
            case "Jan":
                month = "January";
                break;
            case "Feb":
                month = "February";
                break;
            case "Mar":
                month = "March";
                break;
            case "Apr":
                month = "April";
                break;
            case "Jun":
                month = "June";
                break;
            case "Jul":
                month = "July";
                break;
            case "Aug":
                month = "August";
                break;
            case "Sep":
                month = "September";
                break;
            case "Oct":
                month = "October";
                break;
            case "Nov":
                month = "November";
                break;
            case "Dec":
                month = "December";
                break;
            default:
                break;
        }
        let day = b[2];
        let year = b[3];
        array[i].date = month + " " + day + ", " + year;
    }
    return array;
}

export default sortEvents;