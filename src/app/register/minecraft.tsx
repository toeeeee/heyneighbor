// "use client"

// import React, { useState } from 'react';
// import "./MinecraftStyle.css";
// import { useRouter } from 'next/navigation'

// const RegistrationPage: React.FC = () => {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
   
//   username: '',
//     //email: '',
//     password: '',
//   });


//   const [error, setError] = useState('');


//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };


//   const validateForm = () => {
//     if (!formData.username || !formData.password) {
//       setError('All fields are required!');
//       return false;
//     }
//     if (formData.password.length < 6) {
//       setError('Password must be at least 6 characters long!');
//       return false;
//     }
//     return true;
//   };


//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (validateForm()) {
//       setError('');
//       //assume API is called:
   
//       console.log('Form submitted', formData);
//     }
//   };


//   return (
//     <div className="registration-container">
//       <h1></h1>
//       <img src="https://i.imgur.com/SuaiIKE.png" alt="Minecraft Logo" className="minecraft-logo" />
//       {error && <div className="error">{error}</div>}
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="username"></label>
//           <input
//             type="text"
//             name="username"
//             className="form-control"
//             placeholder='username'
//             value={formData.username}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="password"></label>
//           <input
//             type="password"
//             name="password"
//             className="form-control"
//             placeholder='password'
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <button type="submit">register</button>
//       </form>
//     </div>
//   );
// };


// export default RegistrationPage;



