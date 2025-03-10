import { useState, ChangeEvent, FormEvent } from "react";
import axios from "../utils/axios";
import { AxiosError } from "axios";

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    favoriteFood: [] as string[],
    image: null as File | null,
  });
  
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    
    const data = new FormData();
    
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        data.append(key, value instanceof File ? value : String(value));
      }
    });

    try {
      const response = await axios.post("/User", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccessMessage("User registered successfully!");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setError(error.response?.data?.message || "Registration failed. Please try again.");
      } else {
        setError("An unexpected error occurred.");
      }
    }
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