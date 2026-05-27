const axios = require("axios");

const getUserProfile = async (req, res) => {

    try {

        const username = req.params.username;

        if(username.length<5){
            res.status(400).json({
                success:false,
                message:"username too short"
            });
        }

        const response = await axios.get(
            `https://api.github.com/users/${username}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
                }
            }
        );

        const userData = response.data;

        res.status(200).json({
            success: true,
            profile: {
                username: userData.login,
                name: userData.name,
                bio: userData.bio,
                followers: userData.followers,
                following: userData.following,
                publicRepos: userData.public_repos,
                avatar: userData.avatar_url,
                location:userData.location,
                company:userData.company,
                blog:userData.blog,
                created_at:userData.created_at

            }
        });

    } catch (error) {

        if (error.response && error.response.status === 404) {

            return res.status(404).json({
                success: false,
                message: "invalid username try again"
            });

        }

        res.status(500).json({
            success: false,
            message: "Server error"
        });

    }

};

const getUserRepos = async(req,res)=>{
    try{
        const username=req.params.username;

         const response = await axios.get(
            `https://api.github.com/users/${username}/repos`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
                }
            }
        );

        let repos = response.data;

        repos.sort(
            (a, b) => b.stargazers_count - a.stargazers_count
        );

        repos = repos.slice(0, 5);
         const cleanedRepos = repos.map((repo) => ({
            name: repo.name,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            language: repo.language
        }));

        res.status(200).json({
            success: true,
            totalRepos: cleanedRepos.length,
            repos: cleanedRepos
        });

    }
    catch(error){
        if(error.response && error.response.status==404){
            res.status(404).json({
                success:false,
                message:"invalid username"
            })
        }
        res.status(500).json({
            success:false,
            message:"failure from server to fetch data"
        })
    }
}


module.exports = {
    getUserProfile,
    getUserRepos
};