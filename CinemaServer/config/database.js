const mongoose = require('mongoose')
const uri = "mongodb+srv://test:123@cluster0.2dt27.mongodb.net/usersDB?retryWrites=true&w=majority";
const local = "mongodb://localhost:27017/usersDB";
try {
  mongoose.connect(
    uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      ignoreUndefined: true
    },

    () => console.log(" Connected to the database!")
  );

} catch {
  console.log("Couldn't connect to the database!");
}