import React, { useState } from "react";
import { TextField, Select, MenuItem, Button, CircularProgress, Box, InputLabel, FormControl, SelectChangeEvent } from "@mui/material";
import { sendEmail } from '../../services/email.service'

const SendEmail = () => {
    const [formData, setFormData] = useState({
        ToEmail: "",
        ToName: "",
        Subject: "",
        Body: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            alert("הטופס נשלח בהצלחה!");
            setLoading(false);
        }, 2000);
    };

    const handleSendEmail = async () => {
        console.log("📝 נתונים לפני שליחה:", formData);
    
        if (!formData.ToEmail || !formData.ToName) {
            alert("נא למלא שם ואימייל של הנמען.");
            return;
        }
    
        try {
            const response = await sendEmail(formData);
            console.log("✅ תגובת שרת:", response);
        } catch (error) {
            console.error("❌ שגיאה בשליחת המייל:", error);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} className="contact-form">
            <FormControl fullWidth>
                <InputLabel>שם הנמען</InputLabel>
                {/* <Select name="requestType" value={formData.requestType} onChange={handleChange}>
        </Select> */}
            </FormControl>
            <TextField label="שם הנמען" name="ToName" value={formData.ToName} onChange={handleChange} required />
            <TextField label="אימייל" name="ToEmail" value={formData.ToEmail} onChange={handleChange} required />
            <TextField label="נושא" name="Subject" value={formData.Subject} onChange={handleChange} required />
            <TextField label="תיאור" name="Body" value={formData.Body} onChange={handleChange} multiline rows={3} />
            <Button type="submit" variant="contained" color="success" className="submit-button" disabled={loading} onClick={handleSendEmail} >
                {loading ? <CircularProgress size={24} color="inherit" /> : "שלח"}
            </Button>
        </Box >
    );
};

export default SendEmail