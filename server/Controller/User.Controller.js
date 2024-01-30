 const {userModel} = require("../models/user.model")


//Create a new User
const createUser = async(req, res) => {
    try {
        const user = await userModel.create(req.body)
        res.status(200).json({message: "User Created", data: user})
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "Cannot Create User"})
    }
}


//get all users
const getUsers = async(req, res) => {
    try {
        const users = await userModel.find()
        res.status(201).json({message: "user Data Fetched", data: users})
    } catch (error) {
        console.log(error);
        res.status(401).json({message: "Cannot fetch users"})
    }   
}


//get user by id
const getUser = async(req, res) => {

    const id = req.params.id

    try {
        const user = await userModel.findById(id)
        res.status(202).json({message: `Details of user of id ${id}`, data: user})
    } catch (error) {
        console.log(error);
        res.status(402).json({message: `Cannot fetch details of user of id ${id}`})
    }
}


//Update user by id
const updateUser = async(req, res) => {
    const id = req.params.id

    try {
        await userModel.findByIdAndUpdate(id, req.body)
        res.status(203).json({message: `Details of user of id ${id}`})
    } catch (error) {
        console.log(error);
        res.status(403).json({message: `Cannot update user of id ${id}`})
    }
}

//Delete User by id
const deleteUser = async(req, res) => {
    const id = req.params.id;

    try {
        await userModel.findByIdAndDelete(id)
        res.status(204).json({message: `User of id ${id} has been deleted successfully`})
    } catch (error) {
        console.log(error);
        res.status(404).json({message: `Cannot delete user of id ${id}`})
    }
}


module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
}