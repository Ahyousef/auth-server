module.exports = (capability) => {
    // capability = create | update | delete | read (this will be from the route)
  
    return (req, res, next) => {
      // we expect req.user to be an object that is added from the bearer auth middleware
      // we need to check if the user have the right capability from the capabilities
      try {
        if (req.user.capabilities.includes(capability)) {
          console.log('capability is ', req.user.capabilities);
          next();
        } else {
          console.log('user does not have capability', req.user.capabilities);
          next('Access Denied');
        }
      } catch (e) {
        next(e.message);
      }
    };
  };