# Directly Training Project

# Back end deployment to Heroku
Create a [Heroku](https://www.heroku.com) account.

Install [Heroku-Cli](https://devcenter.heroku.com/articles/heroku-cli#download-and-install), follow the instructions to install and create a heroku app for your development there
EG

`$ heroku create ms-lab-tests`


**DON'T PUSH TO HEROKU YET**

Install your own Databse plugin:

`$ heroku addons:create jawsdb:kitefin`

Get DB credentials:

`$ heroku config:get JAWSDB_URL`

It will return somethin like:

`mysql://gr6fbtjxjq59el9d:fefkz3p13ufsa759@g8mh6ge01lu2z3n1.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/hm4stiy5qmvd73y6`

Where 

- Username: gr6fbtjxjq59el9d
- Password: fefkz3p13ufsa759
- Host: g8mh6ge01lu2z3n1.cbetxkdyhwsb.us-east-1.rds.amazonaws.com
- Port: 3306
- Database: hm4stiy5qmvd73y6

Use this credentials into your .env.development file.

Get the app url

`$ heroku info -s | grep web_url | cut -d= -f2`

Change the DEFAULT_BASE_URL constant in webapp/constants.js file to target your app url

`export const DEFAULT_BASE_URL = 'https://ms-lab-tests.herokuapp.com/';`

Set `NODE_ENV` to development:

`heroku config:set NODE_ENV=development`

Work as usual, commit to git as usual, when you are done with your changes enter the following command from the root of the project:

`$ git subtree push --prefix server heroku master`

With this you will push your branch to Heroku but only the server folder. 

>For now don't commit this **.env.development** or **constants.js** file changes

If you need to work with the current **ms-labs-be** app request access to

[Mariano Ravinale](mailto:mravinale@makingsense.com)

[Emanuel Pereyra](mailto:epereyra@makingsense.com)
