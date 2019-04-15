import React, { Component } from 'react';
import './css/data.css';
import { BrowserRouter as Router, Link, Redirect, Route } from "react-router-dom";

class LoggedIn_Data extends Component {
    userDetails = {
        _id: null,
        neptun: null,
        name: null,
        password: null,
        email: null,
        role: null,
        last_login: null,
        registration_date: null,


    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.userDetails,
            isLoggedIn: '',
            gyak: '',
        };

    }

    componentDidMount() {
        const encodedValue = encodeURIComponent(sessionStorage.getItem("id"));
        fetch(`/getDetails?id=${encodedValue}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            //body: JSON.stringify(item)

        }).then(response => response.json())
            .then(response => {
                this.setState({ item: response });
                console.log(this.userDetails);
                if (this.state.item.role === "student") {
                    this.fetchstudentgyak();
                }
            });
        console.log("yes");
    };

    componentWillMount() {
        const sesslogged = sessionStorage.getItem("loggedin");

        if (sesslogged !== "true") {
            this.setState({
                isLoggedIn: "true"
            })
        }
    }

    fetchstudentgyak() {
        console.log(this.state.item.neptun)
        fetch(`/getstudentgyak`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: this.state.item.neptun
        }).then(response => {
          
            console.log("kacsa")
        }).then(item => {

            console.log(item);
            console.log("csibe")
        })

    }

    render() {
        if (this.state.isLoggedIn === "false") {
            console.log(this.state.isLoggedIn);
            return <Redirect to="/LoginForm" />
        }


        return (
            <div className="data_margin">
                <ul className="data_list">
                    <li className="data_font">
                        <span>Név:</span>
                        <span>{this.state.item.name}</span>
                    </li>
                    <li className="data_font">
                        <span>Neptun:</span>
                        <span>{this.state.item.neptun}</span>
                    </li>
                    <li className="data_font">
                        <span>E-mail:</span>
                        <span>{this.state.item.email}</span>
                    </li>
                    <li className="data_font">
                        <span>E-Role:</span>
                        <span>{this.state.item.role}</span>
                    </li>
                    <li className="data_font">
                        <span>Utoljára bejelentkezve:</span>
                        <span>{this.state.item.last_login}</span>
                    </li>
                    <li className="data_font">
                        <span>Regisztráció dátuma:</span>
                        <span>{this.state.item.registration_date}</span>
                    </li>
                    <li className="data_font">
                        <span>Gyakorlatvezető:</span>
                        <span>{this.state.item.registration_date}</span>
                    </li>
                    <li className="data_font">
                        <span>Csoport:</span>
                        <span>{this.state.item.gyak_id}</span>
                    </li>
                </ul>
            </div>


        )
    }
}

export default LoggedIn_Data;
