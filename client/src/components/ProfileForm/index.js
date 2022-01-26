import React from 'react';
import API from '../../utils/API';
import AuthService from '../../services/auth.service';
import './style.css';

function ProfileForm(props) {
    const currentUser = AuthService.getCurrentUser();

    const submit = async e => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.target));
        let newUser = {
            userName: formData.name,
            contactEmail: formData.email,
            contactPhone: formData.phone,
            emergencyName: formData.eName,
            emergencyRelationship: formData.eRelation,
            emergencyPhone: formData.ePhone,
            HomeId: currentUser.id
        }
        const result = await API.saveUser(newUser).catch(err => console.error(err))
        props.hideForm();
        document.location.reload();
    }

    return (
        <form className="col-lg-4 col-md-6 col-sm-8 card imitate-btn" onSubmit={submit}>
            <img className="profile-img-card"
                 src="/assets/img/addUser/addUserICON-96.png"/>
            <label className="small form-label bold mt-2">New Roommate</label>
            <input className="small form-control my-1"
                   type="text"
                   placeholder="Name ..."
                   required
                   name={"name"}/>
            <input className="small form-control mb-1"
                   type="text"
                   placeholder="example@email.com"
                   required
                   name={"email"}/>
            <input className="small form-control mb-3"
                   type="text"
                   placeholder="555-555-5555"
                   required
                   name={"phone"}/>
            <label className="small form-label bold">Emergency Contact Info</label>
            <input className="small form-control my-1"
                   type="text"
                   placeholder="Contact name ..."
                   required
                   name={"eName"}/>
            <input className="small form-control mb-1"
                   type="text"
                   placeholder="Relationship"
                   required
                   name={"eRelation"}/>
            <input className="small form-control mb-2"
                   type="text"
                   placeholder="555-555-5555"
                   required
                   name={"ePhone"}/>
            <button className="btn btn-primary ml-auto"
                    type={"submit"}>Save
            </button>
        </form>
    )
}

export default ProfileForm;