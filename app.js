const express = require('express');
const app = express(); 

app.use(express.static("public"));
app.get("/api/user/:username", async (req, res) => {
    const username = req.params.username;
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) {
            return res.status(404).json({
                error: "User not found"
            });
        }
        const user = await response.json();
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Something went wrong"
        });
    }
});

app.listen('3000', function() {
    console.log('SERVER IS RUNNING ON PORT http://localhost:3000');
});