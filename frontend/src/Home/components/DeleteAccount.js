import React from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../actions/userAction';
const DeleteAccount = () => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleDelete = () => {
        // Inside handleDelete function
        dispatch(deleteUser());
        navigate('/'); // Redirect to home page or any other page
        alert("Account deleted successfully");
    }

    return (
        <div className='DeleteAccount'>
            <div>
                <p>Are you sure you want to delete your account?</p>
                <div className='ButtonC'>
                <button onClick={handleDelete}>Yes</button>
                <button onClick={() => navigate("/me")}>No</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteAccount;