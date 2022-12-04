
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const PORT = process.env.PORT || 3000;
const baseUrl = '/onepiece/api/v1';
const app = express();


app.listen(PORT, ()=> {
    console.log(`Server is runing on port: http://localhost:${PORT}${baseUrl}`);
});

/**Welcome page */
app.get(`${baseUrl}`,(req,res)=>{
  
    res.send("WELCOME TO ONE PIECE API. Try following end points"
    
    +`\n\nhttp://localhost:${PORT}${baseUrl}/crewName`+
    `\nhttp://localhost:${PORT}${baseUrl}/crewMembers`+
    `\nhttp://localhost:${PORT}${baseUrl}/Companions`+
    `\nhttp://localhost:${PORT}${baseUrl}/Ships`
    
    ); 

})

/**Name of crew */
app.get(`${baseUrl}/crewName`,(req,res)=>{
    res.json("The StrawHats")
});


/**
 * list of crew members */
const crewMembers=[];
app.get(`${baseUrl}/crewMembers`,(req,res)=>{

    axios.get('https://onepiece.fandom.com/wiki/Straw_Hat_Pirates')
    .then((response)=>{
        const html = response.data;
        const $ = cheerio.load(html);
        let index = 0;

        //look for html element a that contains 
        //character name on webpage we loaded

        $('td small', html).each(function(){
            const chacracterName = $(this).text();

            crewMembers.push({"id": index,"cName":chacracterName});
                index++
        })

        //show only 9 members
        const T = [];
        let i = 0;
        while(i!=10){
            T.push(crewMembers[i])
            i++; 
        }
        //display
        res.json(T);
    }).catch((error)=> 
    console.log(error));
})


/**crew member companions */
const companions =[];
app.get(`${baseUrl}/Companions`,(req,res)=>{

    axios.get('https://onepiece.fandom.com/wiki/Straw_Hat_Pirates')
    .then((response)=>{
        const html = response.data;
        const $ = cheerio.load(html);


        $('td small', html).each(function(){
            const chacracterName = $(this).text();
            companions.push(chacracterName);
        })

        //show only 2 members
        const T = [];
        let i = 12;
        while(i!=14){
            T.push(companions[i])
            i++; 
        }
        //display
        res.json(T);
    }).catch((error)=> 
    console.log(error));
})


/**Crew ships */
const Ships =[];
app.get(`${baseUrl}/Ships`,(req,res)=>{

    axios.get('https://onepiece.fandom.com/wiki/Straw_Hat_Pirates')
    .then((response)=>{
        const html = response.data;
        const $ = cheerio.load(html);


        $('td small', html).each(function(){
            const chacracterName = $(this).text();
            Ships.push(chacracterName);
        })

        //show only 2 members
        const T = [];
        let i = 13;
        while(i<=14){
            T.push(Ships[i])
            i++; 
        }
        //display
        res.json(T);
    }).catch((error)=> 
    console.log(error));
})
