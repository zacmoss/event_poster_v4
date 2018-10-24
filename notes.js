/* proxy in front-end/package.json is used to basically tell create-react-app to
    point to that port for server duties which has the server running on it....

    create-react-app has default config where you would normally have a webpack config
    file, entry point seems to be index.js...


    Using React-Router for 'multiple pages,' technically still on one page, but 
    re-rendered is how I understand it.

    Currently works...haven't tested multiple routes past '/'


    

    Maybe use Axios on 'Page' components to send requests to server, then server
    would hit the mongodb and retrieve info sending back, finally pull in the server
    response with Axios and render. For LoginPage, probably would redirect
    to homepage if user is confirmed, if user not confirmed redirect to error page.

    Need to figure out a solution to keeping mongodb key in .env
    



    The reason that I'm sticking the Header component in each page is b/c 
    I need to be able to pass signedIn and have Header re-render. Could use redux,
    but would rather not over complicate...
    
    For login we're using express-session to show active sign in even after a refresh
    and storing user login info in mongodb 'jive-database' - 'users'
    
*/
