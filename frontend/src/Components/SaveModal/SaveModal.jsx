import {useNavigate } from "react-router-dom"
export default function SaveModal() {
    const navigate = useNavigate
  return (
    <div className="modal__overlay">
      <div className="modal__container">
        <p>Your story won't be saved when you leave.</p>
        <p>Would you like to create an account?</p>
        <button onClick={() => navigate("/CreateUser")}>Create Account</button>
      </div>
    </div>
    );
}
