import { useState } from "react";

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
      userName: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role:"user",
      phone: '',
      image: null as File | null,
      
  });
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, image: e.target.files ? e.target.files[0] : null });
  };


return (
  <form onSubmit={handleSubmit}>
    {error && <p style={{ color: "red" }}>{error}</p>}
    {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    <input type="text" name="userName" placeholder="Username" onChange={handleChange} required />
    <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
    <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
    <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
    <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
    <input type="tel" name="phone" placeholder="Phone" onChange={handleChange} />
    <input type="file" name="image" onChange={handleFileChange} accept="image/*" required />
    <button type="submit">Register</button>
  </form>
);
};
=======
  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      try {
          console.log("Trying to register");
          const response = await addUser(formData);
          console.log(response);
          setSuccessMessage("User registered successfully!");
      } catch (err: unknown) {
          if (err instanceof Error) {
              setError(err.message || "Failed to Register");
          } else {
              setError("An unknown error occurred");
          }
      } finally {
          console.log("Finally");
      }
  };

  return (
      <div>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
              <label htmlFor="userName">Username:</label>
              <input 
                  type="text" 
                  id="userName" 
                  name="userName"
                  value={formData.userName} 
                  onChange={handleChange} 
                  required
              /><br /><br />
              
              <label htmlFor="firstName">First Name:</label>
              <input 
                  type="text" 
                  id="firstName" 
                  name="firstName"
                  value={formData.firstName} 
                  onChange={handleChange} 
                  required
              /><br /><br />
              
              <label htmlFor="lastName">Last Name:</label>
              <input 
                  type="text" 
                  id="lastName" 
                  name="lastName"
                  value={formData.lastName} 
                  onChange={handleChange} 
                  required
              /><br /><br />
              
              <label htmlFor="email">Email:</label>
              <input 
                  type="email" 
                  id="email" 
                  name="email"
                  value={formData.email} 
                  onChange={handleChange} 
                  required
              /><br /><br />
              
              <label htmlFor="password">Password:</label>
              <input 
                  type="password" 
                  id="password" 
                  name="password"
                  value={formData.password} 
                  onChange={handleChange} 
                  required
              /><br /><br />
              
              <label htmlFor="phone">Phone:</label>
              <input 
                  type="tel" 
                  id="phone" 
                  name="phone"
                  value={formData.phone} 
                  onChange={handleChange}
              /><br /><br />
              
              <label htmlFor="image">Profile Image:</label>
              <input 
                  type="file" 
                  id="image" 
                  name="image"
                  onChange={handleFileChange} 
                  accept="image/*"
              /><br /><br />
              
              <input type="submit" value="Register" />
          </form>
          
          {error && <h1 style={{ color: "red" }}>{error}</h1>}
          {successMessage && <h1 style={{ color: "green" }}>{successMessage}</h1>}
      </div>
  );
};