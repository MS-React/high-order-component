# High Order Components

_A higher-order component (HOC) is an advanced technique in React for reusing component logic. HOCs are not part of the React API, per se. They are a pattern that emerges from React’s compositional nature._

Documentation about [HOC pattern](https://reactjs.org/docs/higher-order-components.html)

# How does it work?

Concretely, a higher-order component is a function that takes a component and returns a new component.

```javascript
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```

# Use HOCs For Cross-Cutting Concerns

Components are the primary unit of code reuse in React. However, you’ll find that some patterns aren’t a straightforward fit for traditional components.

# Subscriber

```javascript
class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      // "DataSource" is some global data source
      comments: DataSource.getComments()
    };
  }

  componentDidMount() {
    // Subscribe to changes
    DataSource.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    // Clean up listener
    DataSource.removeChangeListener(this.handleChange);
  }

  handleChange() {
    // Update component state whenever the data source changes
    this.setState({
      comments: DataSource.getComments()
    });
  }

  render() {
    return (
      <div>
        {this.state.comments.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </div>
    );
  }
}
```

# Subscriptor

```javascript


// This function takes a component...
function withSubscription(WrappedComponent, selectData) {
  // ...and returns another component...
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        data: selectData(DataSource, props)
      };
    }

    componentDidMount() {
      // ... that takes care of the subscription...
      DataSource.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
      DataSource.removeChangeListener(this.handleChange);
    }

    handleChange() {
      this.setState({
        data: selectData(DataSource, this.props)
      });
    }

    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };
}
```

# Consumer

```javascript
const CommentListWithSubscription = withSubscription(
  CommentList,
  (DataSource) => DataSource.getComments()
);
```

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
