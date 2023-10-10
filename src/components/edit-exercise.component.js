import { React, useState, useEffect } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.module.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function EditExercise(props) {

    const [username, setUsername] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState(0);
    const [date, setDate] = useState(null);
    const [users, setUsers] = useState([]);

    const { id } = useParams();

    useEffect(() => {


        axios.get('https://exercise-tracker-kaustubh.vercel.app/exercises/' + id)
            .then(response => {
                setUsername(response.data.username);
                setDescription(response.data.description);
                setDuration(response.data.duration);
                setDate(new Date(response.data.date));
            })
            .catch(err => console.log(err));

        axios.get('http://localhost:5000/users/')
            .then(response => {
                if (response.data.length > 0) {
                    setUsers(response.data.map(user => user.username));
                }
            })
            .catch(err => console.log(err));
    }, [])

    const onSubmit = (e) => {
        e.preventDefault();

        const exercise = {
            username: username,
            description: description,
            duration: duration,
            date: date
        }

        console.log(exercise);

        axios.post('http://localhost:5000/exercises/update/' + id, exercise)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));

        setUsername('');
        setDescription('');
        setDuration(0);
        setDate(null);
    }

    return (
        <div>
            <h3>Edit Exercise Log</h3>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label>Username: </label>
                    <select
                        required
                        className='form-control'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    >
                        {users.map((user) => {
                            return <option key={user} value={user}>{user}</option>
                        })}
                    </select>
                </div>
                <div className='form-group'>
                    <label>Description:</label>
                    <input type='text'
                        required
                        className='form-control'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label>Duration (in min):</label>
                    <input type='number'
                        required
                        className='form-control'
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label>Date:</label>
                    <div>
                        <ReactDatePicker
                            selected={date}
                            onChange={setDate}
                        />
                    </div>
                </div>
                <div className='form-group'>
                    <input type='submit' value='Create Exercise Log' className='btn btn-primary' />
                </div>
            </form>
        </div>
    )
}

export default EditExercise;