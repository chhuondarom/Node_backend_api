const UserModel = require('../model/user')
// Create and Save a new user
exports.create = async (req, res) => {  
    const user = new UserModel({
        id_no: req.body.id_no,
        full_name: req.body.full_name,
        dob: req.body.dob,
        gender: req.body.gender
    });
    
    await user.save().then(data => {
        res.send({
            message:"User created successfully!!",
            user:data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating user"
        });
    });
};

exports.search = async (req, res) => {
    try {
        const filter = {};

        if (req.query.id_no) {
          filter.id_no = req.query.id_no;
        }
      
        if (req.query.full_name) {
          filter.full_name = req.query.full_name;
        }

        if (req.query.dob) {
            filter.dob = req.query.dob;
        }

        if (req.query.gender) {
            filter.gender = req.query.gender;
        }

        const result = await UserModel.find(filter);
        res.send(result);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};
// Retrieve all users from the database.
exports.findAll = async (req, res) => {
    try {
        const user = await UserModel.find();
        res.status(200).json(user);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};

// Find a single User with an id
exports.findOne = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        res.status(200).json(user);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};
// Update a user by the id in the request
exports.update = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    
    const id = req.params.id;
    
    await UserModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `User not found.`
            });
        }else{
            res.send({ message: "User updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
exports.destroy = (req, res) => {
    const id = req.params.id;
  
    UserModel.findByIdAndDelete(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
          });
        } else {
          res.send({
            message: "Tutorial was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + id
        });
      });
  };