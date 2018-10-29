/* proxy in front-end/package.json is used to basically tell create-react-app to
    point to that port for server duties which has the server running on it....

    create-react-app has default config where you would normally have a webpack config
    file, entry point seems to be index.js...


    Using React-Router for 'multiple pages,' technically still on one page, but 
    re-rendered is how I understand it.


    Maybe use Axios on 'Page' components to send requests to server, then server
    would hit the mongodb and retrieve info sending back, finally pull in the server
    response with Axios and render. For LoginPage, probably would redirect
    to homepage if user is confirmed, if user not confirmed redirect to error page.
    

    The reason that I'm sticking the Header component in each page is b/c 
    I need to be able to pass signedIn and have Header re-render. Could use redux,
    but would rather not over complicate...
    
    For login we're using express-session to show active sign in even after a refresh
    and storing user login info in mongodb 'jive-database' - 'users'

    Using window.location.reload(true) on Header component when user logs out to reset
    the event feed to not display 'going' and 'interested




    To Do

    First Final

    Consider that maybe we need to check interested and going on the server at the
    eventfeed request and then send back confirming or non-confirming variables which 
    are then used by DotOne and DotTwo

    Add 'interested' and 'going' components

    Consider intersted and going style where words are at top either highlighted
    or not, no colors involved. And before either is picked, the style would be
    to highlight them on hover and stay highlighted if clicked. Maybe have yellow
    and green colors...

    Style logout button

    Maybe add event feed filter

    Clear server.js clutter

    Clear un-needed files

    Deploy to heroku

    Add to portfolio





    Save a Style 1 (Base) final and a Style 2 (NYC) final

    Style 1 re-add inset box shadow at top of homepage, form page. Add box shadow to
    form container and submit button. Add gray background color for forms.

    Add event feed filter on left section of home page to filter events

    Could not do 'going' 'interested' as handlers, maybe try to make the dots components
    and pass the needed data into the component as props

    Need to clean up server.js and possibly remove all the signedIn variables, b/c
    of use of express-sessions

    Use event ids and pass them to user's going or interested arrays

    When Logged in have event feed show going or interested

    When Logged in allow user to click going or interested and save that (would 
    need to either re-render page to show change or just change color on a click and 
    let the 'true result' show when feed is rendered again or could only have going
    and interested butttons on a page after we click on specific event)

    Limit description words/characters amount on event feed, with a show more link
    at the end.

    Let user click on event card to see in depth event.

    Add date input for createEvents and add to server file db creation and eFeed display

    Consider different 'going' 'interested' display style in event cards. Maybe have
    grayed out 'interested' 'going' and if they click they are pushed and highlighted

    Need to figure out a solution to keeping mongodb key in .env




    Styles

    Stye 1

    Too boring...



    Style 2

    Pic 4 - New York Night Background - Grayish Blue Asthetic

    Can't figure out what is best way to do height on form pages, bc on page loads
    background pic moves bc of differing heights...but all attempts to fix this
    cause a different issue. For example, on trying to set a fixed height on
    form_page_container the form is stretching to length of page, not sure why...
    
*/
