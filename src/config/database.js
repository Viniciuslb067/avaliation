module.exports = {
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: 'admin',
  database: 'avaliation',
  define: {
    dialectOptions: {
      useUTC: false, // for reading from database
    },
    underscored: true,
    timestamps: true,
  },
  
}