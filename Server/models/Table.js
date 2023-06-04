module.exports=(sequelize,DataTypes)=>{


    const Table=sequelize.define("Table",{

        title:{
            type : DataTypes.STRING,
            allowNull : false
        },
        description:{
            type : DataTypes.STRING,
            allowNull : false
        },
        username:{
            type : DataTypes.STRING,
            allowNull : false
        }

    });
    Table.associate=(models)=>{
        Table.hasMany(models.Comments,{
            onDelete :'cascade' 
        })
    }

    
    return Table;
}