import { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import Layout from '../../components/mylayout'
var ls = require('local-storage');
import Router from 'next/router'

// import { login } from '../utils/auth'

class Login extends Component {
    //   static getInitialProps ({ req }) {
    //     const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'

    //     const apiUrl = process.browser
    //       ? `${protocol}://${window.location.host}/api/login.js`
    //       : `${protocol}://${req.headers.host}/api/login.js`

    //     return { apiUrl }
    //   }

    constructor(props) {
        super(props)

        this.state = { email: '', password: '', error: '' }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        console.log(event);

        this.setState({ [event.target.name]: event.target.value })
    }

    async handleSubmit(event) {
        event.preventDefault()
        const data = {
            email: this.state.email,
            password: this.state.password

        }
        const url = this.props.apiUrl
        console.log("login called ", data);


        try {
            const response = await fetch('http://fundoonotes.incubation.bridgelabz.com/api/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            if (response.ok) {
                console.log("login called resposne ok ");

                const res = await response.json()
                console.log(res);
                ls.set('token', res.id)
                ls.set('firstname', res.firstName)
                ls.set('lastname', res.lastName)
                Router.push("/about")

                // login({ token })
            } else {
                console.log('Login failed.')
                // https://github.com/developit/unfetch#caveats
                let error = new Error(response.statusText)
                error.response = response
                return Promise.reject(error)
            }
        } catch (error) {
            console.error(
                'You have an error in your code or there are Network issues.',
                error
            )
            throw new Error(error)
        }
    }

    render() {
        return (
            <Layout>
                <div className='login'>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor='username'>email</label>

                        <input
                            type='text'
                            id='username'
                            name='email'
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                        <label htmlFor='username'>password</label>

                        <input
                            type='text'
                            id='username'
                            name='password'
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                        <label htmlFor='username'>password</label>

                        <input
                            type='text'
                            id='username'
                            name='password'
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                        <label htmlFor='username'>password</label>

                        <input
                            type='text'
                            id='username'
                            name='password'
                            value={this.state.password}
                            onChange={this.handleChange}
                        />

                        <button type='submit'>Login</button>

                        <p className={`error ${this.state.error && 'show'}`}>
                            {this.state.error && `Error: ${this.state.error}`}
                        </p>
                    </form>
                </div>
                <style jsx>{`
          .login {
            max-width: 340px;
            margin: 0 auto;
            padding: 1rem;
            border: 1px solid #ccc;
            border-radius: 4px;
          }
          form {
            display: flex;
            flex-flow: column;
          }
          label {
            font-weight: 600;
          }
          input {
            padding: 8px;
            margin: 0.3rem 0 1rem;
            border: 1px solid #ccc;
            border-radius: 4px;
          }
          .error {
            margin: 0.5rem 0 0;
            display: none;
            color: brown;
          }
          .error.show {
            display: block;
          }
        `}</style>
            </Layout>
        )
    }
}

export default Login