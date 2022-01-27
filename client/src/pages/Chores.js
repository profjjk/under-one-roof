import React, { useEffect, useState } from 'react';
import API from '../utils/API';
import './style.css';
import AuthService from '../services/auth.service';
import ChoreTableRow from '../components/ChoreTableRow';

import { DELETE_CHORE, ADD_CHORE } from '../utils/redux/constants/actions';
import { connect } from 'react-redux';

const Chores = ({ chores, addChore, deleteChore }) => {
    console.log("Chores:", chores);



    // Getting data from state and page
    const [Oldchores, setOldChores] = useState([]);
    const [users, setUsers] = useState([]);
    const currentUser = AuthService.getCurrentUser();

    // Data Retrieval Functions
    const getHomeId = () => {
        const HomeId = currentUser.id;
        return HomeId;
    }

    let HomeId = getHomeId();

    const getChores = (data) => {
        let id = data;

        API.getChores(id)
            .then(results => {
                setOldChores(results.data);
            }).catch(err => console.error(err))
    };

    useEffect(() => {
        getChores(HomeId);
    }, []);

    // Data Manipulation Functions
    const getAssignee = () => {
        const assigneeId = Math.floor(Math.random() * users.length);
        const uN = users['id', `${assigneeId}`];
        var assignee = 'None';
        if (uN) {
            assignee = uN['userName'];
        }
        return assignee;
    }

    useEffect(() => {
        API.getUsers(HomeId)
            .then(users => {
                // console.log(expenses)
                setUsers(users.data)

            }).catch(err => console.error(err))
    }, [])

    const submit = async e => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.target));
        const newChore = {
            choreName: formData.name,
            choreDescription: formData.description,
            choreFrequency: formData.frequency,
            assignee: getAssignee(),
            HomeId: HomeId
        }
        await API.addChore(newChore);
        setOldChores(newChore);
        window.location.reload();
    };

    return (
        <div className="container-fluid">
            <div className="row-fluid">
                <div className="col md-12">
                    <h1 className="logo large text-center mt-5 red">Household Chores</h1>
                </div>
            </div>
            <div className="row">
                <div className="card col-lg-6 col-md-8">
                    <h2 className="medium mb-5 bold">Chore List</h2>
                    <table className="table w-100"
                           border="1"
                           style={{width: '80%', textAlign: 'center'}}>
                        <thead>
                        <tr>
                            <th>Chore Name</th>
                            <th>Chore Description</th>
                            <th>Chore Frequency</th>
                            <th>Currently Assigned To</th>
                        </tr>
                        </thead>

                        <tbody>
                        {Oldchores ? Oldchores.map(chore => (
                            <ChoreTableRow choreName={chore.choreName}
                                           choreDescription={chore.choreDescription}
                                           choreFrequency={chore.choreFrequency}
                                           assignee={chore.assignee}
                                           key={chore.id}
                            />
                        )) : <></>}
                        </tbody>
                    </table>
                </div>
                <div className="card col-lg-5 col-md-8">
                    <h2 className="medium mb-5 bold">Add a New Chore</h2>
                    <form className="form-group"
                          onSubmit={submit}>
                        <input className="form-control mb-4"
                               required
                               name={'name'}
                               placeholder="Name of chore"/>
                        <input className="form-control mb-4"
                               required
                               name={'description'}
                               placeholder="Brief description of chore"/>
                        <input className="form-control mb-4"
                               required
                               name={'frequency'}
                               placeholder="How often (in days) should the chore be done?"/>
                        <button className="btn btn-success mt-3"
                                type="submit">Add Chore
                        </button>
                    </form>
                </div>
            </div>
        </div>

    )
};

const mapStateToProps = state => ({
    chores: state.chores,
});

const mapDispatchToProps = dispatch => ({
    addChore: newChore =>
        dispatch({ type: ADD_CHORE, newChore }),
    deleteChore:  choreId =>
        dispatch({ type: DELETE_CHORE, choreId })
});

// export default Chores;
export default connect(mapStateToProps, mapDispatchToProps)(Chores);