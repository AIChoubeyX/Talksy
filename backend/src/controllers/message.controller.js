import Message from "../models/message.model.js"
import User from "../models/user.model.js"


export const getUsersForSidebar = async (req,res) => {
    try {
        const loogedInUserId = req.user._id
        const filteredUsers = await User.find({ _id: { $ne: loogedInUserId } }).select("-password")

        res.status(200).json(filteredUsers)
        
    } catch (error) {
        console.error("Error in getUsersForSidebar" , error.message);
        res.status(500).json({message:"Internal server error"})
        
    }
}

export const getMassages = async (req,res) => {
    try {
        const { id:userToChatId} = req.params
        const myId = req.user._id

        const messages = Message.find({
            $or: [
                { senderId : myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
            ]
        })
        res.status(200).json(messages)
        
    } catch (error) {
        console.error("Error in getMassages controller" , error.message);
        res.status(500).json({message:"Internal server error"})
        
    }
}

export const sendMessage = async (req,res)  =>{
    try {
        const { text , image } = req.body
        const { id: receiverId } = req.params
        const senderId = req.user._id

        let imageUrl ;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image) 
               imageUrl = uploadResponse.secure_url
        }

        const newMessage = await Message.create({
            senderId,
            receiverId,
            text,
            image: imageUrl
        })
        await newMessage.save()
        res.status(200).json(newMessage)

        
    } catch (error) {
        console.error("Error in sendMessage controller" , error.message);
        res.status(500).json({message:"Internal server error"})
        
    }
}