const mongoose = require('mongoose')

exports.seedGroupMessage = [
    {
    choir: "African Children's Choir",
    title: "We have received an award!",
    author: "cakevealbladerunner",
    body: "Our hard word supporting communities have been recognized by the London Music Institute",
    comments:[
        {
            comment_id: new mongoose.Types.ObjectId(),
            author: "josephCode",
            body: "Yay!"
        },
        {
            comment_id: new mongoose.Types.ObjectId(),
            author:"genie",
            body: "I'm so proud"
        }
    ]
},
]