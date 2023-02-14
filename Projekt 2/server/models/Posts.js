module.exports = (sequelize, DataTypes) => {

    const Posts = sequelize.define("Posts", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        postText: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    Posts.associate = (models) => {
        Posts.hasMany(models.Comments, {
            onDelete: "cascade",
        });
    }; //powiazanie tabeli Comments z Posts ( w com tworzy sie PostsID )

    return Posts;
}