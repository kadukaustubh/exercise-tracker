import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Exercise(props) {
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0, 10)}</td>
        <td>
            <Link to={'/edit/' + props.exercise._id}>edit</Link> | <a href='#' onClick={() => {
                props.deleteExercise(props.exercise._id)
            }}>delete</a>
        </td>
    </tr>
}

function ExercisesList() {
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        axios.get('https://exercise-tracker-kaustubh.vercel.app/exercises')
            .then(response => {
                setExercises(response.data);
            })
            .catch(err => console.log(err));
    }, [])

    function deleteExercise(id) {
        axios.delete('https://exercise-tracker-kaustubh.vercel.app/exercises/' + id)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));

        setExercises(exercises.filter(el => el._id !== id));
    }

    function exerciseList() {
        exercises.map(currentExercise => {
            return <Exercise exercise={currentExercise} deleteExercise={deleteExercise} key={currentExercise._id} />;
        })
    }

    return (
        <div>
            <h3>Logged Exercises:</h3>
            <table className='table'>
                <thead className='thead-light'>
                    <tr>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        exercises.map(currentExercise => {
                            return (
                                <tr key={currentExercise._id}>
                                    <td>{currentExercise.username}</td>
                                    <td>{currentExercise.description}</td>
                                    <td>{currentExercise.duration}</td>
                                    <td>{currentExercise.date.substring(0, 10)}</td>
                                    <td>
                                        <Link to={'/edit/' + currentExercise._id}>edit</Link> | <a href='#' onClick={() => {
                                            deleteExercise(currentExercise._id)
                                        }}>delete</a>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ExercisesList;