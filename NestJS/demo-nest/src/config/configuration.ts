export default () => ({
  port: process.env.PORT || 3000,

  mongo: {
    uri: process.env.MONGO_URI,
  },

  mysql: {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    pass: process.env.MYSQL_PASS,
    db: process.env.MYSQL_DB,
  },

  jwt: {
    secret: process.env.JWT_SECRET,
  },
});