const bcrypt = require('bcryptjs');

module.exports ={

  register: async (req,res) =>{
    const {username, password, profile_pic} = req.body;
    console.log('register server ping');
    console.log(req.body);
    const db = req.app.get('db');
    const result = await db.find_user_by_username([username]);
    const existingUser = result[0];
    if (existingUser){
      return res.status(409).send(`Account already exists with eamil ${username}`);
    };
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password,salt);
    const registeredUser = await db.create_user([username, hash, profile_pic]);
    console.log(registeredUser)
    const user = registeredUser[0];
    req.session.user = {id: user.id, username: user.username,};
    return res.status(201).send(req.session);
  },

  login: async (req,res) =>{
    const {username, password} = req.body;
    const foundUser = await req.app.get('db').find_user_by_username([username]);
    const user = foundUser[0];
    if (!user){
      return res.status(401).send('User not found');
    }
    const isAuthenticated = bcrypt.compareSync(password, user.hash);
    if (!isAuthenticated){
      return res.status(403).send('Wrong password');
    }
    req.session.user = {id: user.id, username: user.username};
    return res.send(req.session);
  },

  logout: (req,res) =>{
    req.session.destroy();
    return res.sendStatus(200);
  },

  getUser: (req,res) =>{
    const user = foundUser[0];
    if (!user){
      return res.status(404).send('No user found')
    }
    return res. status(200).send(`${req.session.user}`)
  }
}