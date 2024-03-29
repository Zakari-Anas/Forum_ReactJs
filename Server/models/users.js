module.exports=(sequelize,DataTypes)=>{


    const Users=sequelize.define("Users",{

        password:{
            type : DataTypes.STRING,
            allowNull : false
        }, 
        username:{
            type : DataTypes.STRING,
            allowNull : false
        }

    });
    
    Users.associate=(models)=>{
        Users.hasMany(models.Table,{
            onDelete :'cascade'
        })
    }

    Users.associate=(models)=>{
        Users.hasMany(models.Comments,{
            onDelete :'cascade'
        })
    }
 
    return Users;
}