import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";

const style = {
    hero: {
        maxHeight: '350px',
        objectFit: 'contain'
    }
}

const Landing = () => {
    const [content, setContent] = useState("");

    useEffect(() => {
        UserService.getPublicContent().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();

                setContent(_content);
            }
        );
    }, []);

    return (
        <main className="container-fluid">
            <header className="row d-flex">
                <img className="img-fluid col-12 mx-auto my-5" src="/assets/img/Brand/UnderOneRoof.png" style={style.hero}></img>
                <h2 className="col-12 large text-center purple">Welcome to</h2>
                <h1 className="col-12 xlarge text-center blue logo display-3"><span className="blue">Under</span><span className="yellow">One</span><span className="red">Roof</span></h1>
            </header>
        </main>
    );
};

export default Landing;