import Message from "./model.js";
import User from "../users/model.js";

// Send a message
export const sendMessage = async (req, res, next) => {
  try {
    const { receiverId, content } = req.body;
    const senderId = req.user.id; // from auth middleware

    // check if receiver exists
    const receiver = await User.findById(receiverId);
    if (!receiver) return res.status(404).json({ msg: "Receiver not found" });

    const message = new Message({
      sender: senderId,
      receiver: receiverId,
      content
    });
    await message.save();

    res.status(201).json(message);
  } catch (err) {
    next(err); // 500 error handled by global error handler
  }
};

// Get conversation between two users
export const getConversation = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const myId = req.user.id;

    const messages = await Message.find({
      $or: [
        { sender: myId, receiver: userId },
        { sender: userId, receiver: myId }
      ]
    })
      .populate("sender", "username")
      .populate("receiver", "username")
      .sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    next(err); // 500
  }
};

// Get inbox (list of last messages per friend)
export const getInbox = async (req, res, next) => {
  try {
    const myId = req.user.id;
    
    const messages = await Message.aggregate([
      {
        $match: {
          $or: [{ sender: myId }, { receiver: myId }]
        }
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ["$sender", myId] },
              "$receiver",
              "$sender"
            ]
          },
          lastMessage: { $first: "$$ROOT" }
        }
      }
    ]);

    console.log("Messages:", messages);

    res.json(messages);
  } catch (err) {
   next(err); // 500
  }
};
