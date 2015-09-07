------------------------

This is a project for Preisthood or Relief Society leaders to more easily track home/visiting teaching. It allows for a single sign on for the general body of the priesthood/relief society to sign in and record their visits. And then the presidency for that body can then sign in and see all the visits.

It shows a history of each household/sister.

It shows a report for the current month and the previous month.

The reports are organized in a way to easily transfer the data over to [lds.org](https://www.lds.org/)

This project runs on an Ember CLI app. It uses the `ember-cli-rails` gem to integrate into Rails.

------------------------

Install bin stubs to work with spring

`bundle exec spring binstub --all`

-----------------------

To run the server in development:

`bin/rails s`

-----------------------

run `guard` to watch specs

-----------------------

Deployment

I have found it easiest to deploy to [Heroku](https://www.heroku.com/) I have setup the my heroku app to follow the guide on the [ember-cli-rails](https://github.com/rwz/ember-cli-rails#heroku) gem.

Fork this project.

For this project the only thing you'll need to do is enable Heroku Multi Buildpack by running the following command:

```sh
heroku buildpacks:set https://github.com/heroku/heroku-buildpack-multi
```

In my case I have two servers: one for home teaching and one for visiting teaching.

So I have to run:

```sh
heroku buildpacks:set https://github.com/heroku/heroku-buildpack-multi --app <app-name>
```

After adding the buildpack you can just push it up to heroku as usual.

```sh
git push heroku master
```

Again in my case I have two servers so I have setup two git refs for each and run

```sh
git push heroku-vt master
```

or

```sh
git push heroku-ht master
```

After pushing up you'll need to migrate the database

```sh
heroku run rake db:migrate --app <app-name>
```

Now seed the database

```sh
heroku run rake db:seed --app <app-name>
```

And remember to change your password!

I use rollbar to handle error reporting. You can as well, just sign up for an account and add an env variable `ROLLBAR_ACCESS_TOKEN` to your heroku config variables.
