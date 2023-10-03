const mongoose = require("mongoose");

// 2nd Collection --> Notes -> in which User after successful LOGIN can add their notes such as --> Title and desc/note
const NotesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    userId: {
        type: String, // or ObjectId, depending on how you store user IDs
        required: true,
    },
});
usernotes = new mongoose.model("usernotes", NotesSchema);
module.exports = usernotes; // export in SEVER file
